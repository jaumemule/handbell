const Merchants = require('../models/merchants.js');
const Encrypter = require('../application/encrypter.js');

let self = (module.exports = {
    create: function(req, res, next) {

        // TODO crate validators...
        if (
            !req.body ||
            !req.body.email ||
            !req.body.paymentProvider
        )
            // TODO standarise responses
            return res.status(400).send();

        const Merchant = new Merchants();

        let salt = Encrypter.createSalt()
        let iv = Encrypter.createIv()

        Merchant.name = req.body.name
        Merchant.email = Encrypter.encrypt(req.body.email, salt, iv)
        Merchant.paymentProvider = req.body.paymentProvider

        if (req.body.sandboxApiKey) {
            Merchant.sandboxApiKey = Encrypter.encrypt(req.body.sandboxApiKey, salt, iv)
        }

        if (req.body.productionApiKey) {
            Merchant.productionApiKey = Encrypter.encrypt(req.body.productionApiKey, salt, iv)
        }

        Merchant.salt = salt

        Merchant.save(function(err, merchant) {
            if (err) {
                console.log(err)
                return res.status(500).send({error:'Could not create'})

            } else {
                return res.status(201).send({message: "Merchant has been created!"})
            }
        })
    },
    retrieve: function (req, res, next) {
        Merchants.findOne({ _id: req.params.merchantId })
            .select('name active runOnMode isOpen')
            .exec(function (err, merchant) {
            if (err !== null) {
                return res.status(400).send()
            }

            if (merchant === null) {
                return res.status(404).send()
            }

            return res.status(200).send(merchant)
        })
    },
    openClose: function (req, res) {
        Merchants.findOneAndUpdate(
            { _id: req.body.userSession.merchantId },
            { isOpen: req.body.isOpen }, function (error, merchant) {
                if (error) {
                    res.status(400).send()
                } else {
                    res.status(200).send({})
                }
            });
    }
})