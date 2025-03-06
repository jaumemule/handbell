const Orders = require('../models/orders.js');
const Payments = require('../models/payments.js');
const MenuItems = require('../models/menuItems.js');
const Merchants = require('../models/merchants.js');
const OrdersController = require('./ordersController.js'); // todo extract to repositories, do not couple controllers
const mongoose = require('mongoose');
ObjectID = require('mongodb').ObjectID;

const Encrypter = require('../application/encrypter.js');

const io = require('../services/socketProvider').container

module.exports = {
    create: function(req, res, next) {
        let menuItems = req.body.menuItems
        let sessionId = req.body.sessionId
        let tip = req.body.tip
        let tableNumber = req.params.tableNumber
        let merchantId = req.params.merchantId
        let deviceId = req.params.deviceId

        let ids = []
        let hashMap = {}
        for (i = 0; i < menuItems.length; i++) {
            ids.push(mongoose.Types.ObjectId(menuItems[i]._id))
            hashMap[menuItems[i]._id] = menuItems[i].quantity // to calculate the price
            if (ids.length === menuItems.length) {
                compute(ids, hashMap, tip, function(errorMessage) {
                    res.status(400).send(errorMessage)
                })
            }
        }

        // TODO refactor this ugly as fuck algo and unit test it
        function compute(ids, hashMap, tip, errCb) {
            MenuItems.find({ "_id": {$in : ids}, active: true }, function (err, menuItems) {
                if (!menuItems) {
                    return res.status(400).send('Some error happened :(')
                } else {

                    if (menuItems.length < ids.length) {
                        return errCb('An item is inactive')
                    } else {
                        let totalPrice = tip
                        let orders = []

                        for (i = 0; i < menuItems.length; i++) {

                            let quantity = hashMap[menuItems[i]._id]

                            if (quantity <= 0) {
                                return errCb('Quantity cannot be below or equal to 0')
                            } else {
                                let price = menuItems[i].price * quantity
                                totalPrice += price

                                for (y = 0; y < quantity; y++) {
                                    orders.push(menuItems[i])
                                }

                                if (menuItems.length === i + 1) {
                                    persist(totalPrice, orders, tip)
                                }
                            }

                        }
                    }
                }
            });
        }

        function persist(totalPaymentPrice, orders) {

            let PaymentsEntity = new Payments()
            let paymentId = new ObjectID();

            PaymentsEntity._id = paymentId.toHexString()
            PaymentsEntity._merchantId = merchantId
            PaymentsEntity.sessionId = sessionId
            PaymentsEntity.deviceId = deviceId
            PaymentsEntity.tableNumber = tableNumber
            PaymentsEntity.totalPrice = totalPaymentPrice
            PaymentsEntity.orders = orders
            PaymentsEntity.tip = tip

            PaymentsEntity.save(function(err) {
                if (err) { 
                    console.log(err)
                    return res.status(500).send({error:'Could not create payment :('}) 
                } else {
                    let insertCounter = 0
                    for (i = 0; i < orders.length; i++) {

                        let OrdersEntity = new Orders()

                        OrdersEntity._merchantId = merchantId
                        OrdersEntity._paymentId = paymentId
                        OrdersEntity.sessionId = sessionId
                        OrdersEntity.deviceId = deviceId
                        OrdersEntity.tableNumber = tableNumber
                        OrdersEntity.price = orders[i].price
                        OrdersEntity._menuItem = orders[i]._id

                        OrdersEntity.save(function(err) {
                            if (err) {
                                return res.status(500).send({error:'Could not create payment :('}) 
                            } else {
                                insertCounter++

                                if (orders.length === insertCounter) {
                                    notifyPaymentProvider(paymentId, totalPaymentPrice, merchantId, function(providerPaymentId){
                                        res.status(201).send({
                                            paymentId: paymentId,
                                            providerPaymentId: providerPaymentId
                                        })
                                    }, function(errorString) {
                                        // TODO monitor activity
                                        res.status(400).send({message: errorString})
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }

        function notifyPaymentProvider(paymentId, amount, merchantId, cb, cbErr) {

            function defineIntegrationKey(runningMode, productionKey, sandboxKey, salt, integrationCb) {

                if (runningMode === 'real_money' && productionKey) {
                    integrationCb(Encrypter.decrypt(productionKey, salt))
                } else if (sandboxKey) {
                    integrationCb(Encrypter.decrypt(sandboxKey, salt))
                } else {
                    cbErr('No integration is set for merchant')
                }
            }

            Merchants.findOne({ _id: merchantId }).exec(function (err, merchant) {
                if (merchant === null) {
                    cbErr('Payment provider not set')
                } else if (merchant.isOpen === false) {
                    cbErr('Merchant is not open yet')
                } else if (merchant.active === false) {
                    cbErr('Merchant is not active')
                } else {
                    defineIntegrationKey(merchant.runOnMode, merchant.productionApiKey, merchant.sandboxApiKey, merchant.salt, function (key) {

                        if (merchant.paymentProvider === 'MOLLIE') {

                            // const monei = new Monei(key);
                            // let response = monei.payments.create({
                            //     amount: amount,
                            //     currency: 'EUR',
                            //     orderId: paymentId,
                            //     description: 'Purchase - #' + paymentId,
                            //     callbackUrl: 'https://handbell.digital/api/v1/payment-callback'
                            // });

                            response.then(function (value) {
                                // cb(value.id)
                                cb('lala')
                            })
                        } else {
                            cbErr('Payment provider not set')
                        }
                    })
                }

            });
        }
    },

    getById: function(req, res, next) {
        Payments.findOne({_id: req.params.paymentId}, function(err, payment) {
            if (payment === null) {
                return res.status(404).send()
            } else {
                return res.send(payment)
            }
        })
    },

    paymentProviderCallback: function(req, res, next) 
    {
        let payload = req.body

        let status = payload.status
        let paymentId = payload.orderId

        if (status === 'SUCCEEDED') {
            Payments.findOneAndUpdate(
                { _id: paymentId }, 
                { state: 'payment_confirmed' }, function (error, payment) {
                    if (error) {
                        res.status(400).send({message: 'Error on save'})
                    } else {
                        notifyMerchantAndShopper(paymentId, 'success')
                    }
                });
        } else {
            Payments.findOneAndUpdate(
                { _id: paymentId },
                { state: 'payment_failed' }, function (error, payment) {
                    if (error) {
                        res.status(400).send({message: 'Error on save'})
                    } else {
                        notifyMerchantAndShopper(paymentId, 'failure')
                    }
                });
        }

        function notifyMerchantAndShopper(paymentId, status) { // success / failure
            if (status === 'success') {

                Payments.findByIdAndUpdate(
                    { _id: paymentId },
                    { state: 'payment_confirmed' }, function (error, payment) {
                        if (error) {
                            res.status(400).send({message: 'Error on save'})
                        } else {
                            Orders.updateMany({"_paymentId": paymentId}, {"$set":{"state": 'merchant_notified'}}, {"multi": true}, (err, writeResult) => {
                                OrdersController._currentDayOrdersByMerchantId(payment._merchantId, function(records) {
                                    io.emit('order-update/' + payment._merchantId, { orders: records, sound: true });
                                    io.emit('shopper-order-update/' + paymentId, {'status': status});
                                    return res.status(200).send({message: "Received"})
                                })
                            });
                        }
                });
            } else {
                io.emit('shopper-order-update/' + paymentId, {'status': status});
                return res.status(200).send({message: "Received"}) // idempotent
            }
        }
    }
}
