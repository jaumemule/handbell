const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define the schema for our user model
var menuSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    active: {type: Boolean, default: true},
    createdAt: { type: Date, default: Date.now },
    paymentProvider: { type: String, default: 'MOLLIE' },
    sandboxApiKey: String,
    productionApiKey: String,
    salt: String,
    isOpen: { type: Boolean, default: true },
    runOnMode: {type: String, default: 'real_money'}
});

module.exports = mongoose.model('Merchants', menuSchema);
