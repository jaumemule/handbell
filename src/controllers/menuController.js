const MenuItems = require('../models/menuItems.js');
const { v4: uuidv4 } = require('uuid');
const clientLanguage = require('../application/clientLanguage')
const translationsModule = require('../application/allTranslations')

let self = (module.exports = {
    getByMerchantIdAndPersistSession: function(req, res, next) {

        // the language selection is based on what the client requires and what's globally available
        // if the item does not exist in that language, the default one is english
        let iso2CodeFromBrowser = clientLanguage.convertFromAcceptHeader(req.headers["accept-language"])
        let selectedLanguage = clientLanguage.selectFromISOCode2(iso2CodeFromBrowser)

        // TODO persist session ID to verify it later
        MenuItems.find({ _merchantId: req.params.merchantId , active: true}).sort('priority price').exec( function (err, menu) {
            if (!menu || menu.length === 0) {
                res.status(404).send()
            } else {

                let result = [];
                let description = null

                for (i=0; i < menu.length; i++) {
                    if (menu[i].description) {
                        // if the description exists in the selected language, gets selected
                        if (selectedLanguage in menu[i].description) {
                            description = menu[i].description[selectedLanguage]
                        } else {
                            // if it does not exist, fallback to the first existent one and pray for god the person will understand it
                            description = menu[i].description[Object.keys(menu[i].description)[0]]
                        }
                    }

                    let subCategory = null
                    if (menu[i].subCategory !== null) {
                        subCategory = translationsModule.byTagAndLanguage(menu[i].subCategory, selectedLanguage)
                    }

                    result.push({
                        _merchantId: menu[i]._merchantId,
                        active: menu[i].active,
                        currency: menu[i].currency,
                        numberAvailable: menu[i].numberAvailable,
                        category: menu[i].category,
                        subCategory: subCategory,
                        subCategoryTag: menu[i].subCategory,
                        _id: menu[i]._id,
                        createdAt: menu[i].createdAt,
                        title: menu[i].title,
                        price: menu[i].price,
                        description: description
                    })

                    if (i === menu.length - 1) {
                        res.send(
                            {
                                sessionId: uuidv4(),
                                menu: result
                            }
                        )
                    }

                }
            }
        });
    },
    getByMerchantId: function(req, res, next) {
        MenuItems.find({ _merchantId: req.params.merchantId }, function (err, menu) {
            if (!menu) {
                res.status(404).send()
            } else {
                let payload = {
                    sessionId: uuidv4(),
                    menu
                }

                res.send(payload)
            }
        });
    },
    createItemForMerchant: function(req, res, next) {

        let query = {'title': req.body.title};

        let data = {
            _merchantId: req.body.userSession.merchantId,
            title: req.body.title,
            active: req.body.active || true,
            price: req.body.price,
            currency: req.body.currency || 'EUR',
            priority: req.body.priority || 1000,
            numberAvailable: req.body.numberAvailable,
            category: req.body.category,
            subCategory: req.body.subCategory,
            description: req.body.description,
        }

        MenuItems.findOneAndUpdate(query, data, {upsert: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });
    },
    makeItemActive: function(req, res, next) {
        MenuItems.findOneAndUpdate(
            { _id: req.params.itemId, _merchantId: req.body.userSession.merchantId },
            { active: true }, function (error, item) {
                if (error) {
                    res.send() // idempotency for now
                } else {
                    res.send(item)
                }
            });
    },
    makeItemInActive: function(req, res, next) {
        MenuItems.findOneAndUpdate(
            { _id: req.params.itemId, _merchantId: req.body.userSession.merchantId },
            { active: false }, function (error, item) {
                if (error) {
                    res.send() // idempotency for now
                } else {
                    res.send(item)
                }
            });
    }

})