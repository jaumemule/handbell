const Orders = require('../models/orders.js');
const io = require('../services/socketProvider').container

let self = (module.exports = {
    getOpenOrdersByMerchantId: function(req, res, next) {
        self._openOrdersByMerchantId(req.params.merchantId, function(records) {
            res.send(records)
        })
    },

    currentDayOrders: function(req, res, next) {
        self._currentDayOrdersByMerchantId(req.params.merchantId, function(records) {
            res.send(records)
        })
    },

    setAsPreparing: function(req, res, next) {
        self._updateOrderState('merchant_preparing', req.params.orderId, req.body.userSession.merchantId, function(order) {
            if (order === null) {
                res.status(404).send()
            } else {
                self._currentDayOrdersByMerchantId(order._merchantId, function(records) {
                    io.emit('order-update/' + order._merchantId, { orders: records });
                    io.emit('shopper-order-update/' + order._paymentId, {'status': 'preparing'});
                    res.status(201).send(order)
                })
            }
        })
    },

    setAsDelivered: function(req, res, next) {
        self._updateOrderState('merchant_delivered', req.params.orderId, req.body.userSession.merchantId, function(order) {
            if (order === null) {
                res.status(404).send()
            } else {
                self._currentDayOrdersByMerchantId(order._merchantId, function(records) {
                    io.emit('order-update/' + order._merchantId, { orders: records });
                    res.status(201).send(order)
                })
            }
        })
    },
    
    // TODO extract service
    _updateOrderState(state, orderId, merchantId, cb, err) {
        Orders.findOneAndUpdate(
            { _id: orderId, _merchantId: merchantId },
            { state: state }, function (error, order) {
                if (error) {
                    err()
                } else {
                    cb(order)
                }
            });
    },

    // TODO extract service
    _openOrdersByMerchantId(merchantId, cb) {
        Orders
        .find({ _merchantId: merchantId })
        .populate('_menuItem')
        .where('state')
        .in(['merchant_notified', 'merchant_preparing'])
        .exec(function (err, records) {
            cb(records)
        });
    },

    // TODO extract service
    _currentDayOrdersByMerchantId(merchantId, cb) {
        let date = new Date()
        date.setDate(date.getDate()-1);

        console.log(date)
        Orders
        .find({
            _merchantId: merchantId,
            createdAt: { $gte: date }
        })
        .populate('_menuItem')
        .where('state')
        .in(['merchant_notified', 'merchant_preparing', 'merchant_delivered'])
        .exec(function (err, records) {
            cb(records)
        });
    }
})
