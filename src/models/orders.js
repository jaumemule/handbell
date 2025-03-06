// represents every item in the order with its state that the merchant controls

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define the schema for our user model
var paymentsSchema = mongoose.Schema({
    _merchantId : { type: Schema.Types.ObjectId, ref: 'Merchants', default: null },
    sessionId: String,
    deviceId: String,
    tableNumber: Number,
    price: Number,
    _menuItem : { type: Schema.Types.ObjectId, ref: 'MenuItems', default: null },
    _paymentId : { type: Schema.Types.ObjectId, ref: 'payments', default: null },
    state: {type: String, default: 'waiting_for_payment'}, // waiting_for_payment, merchant_notified, merchant_preparing, merchant_delivered 
    createdAt: { type: Date, default: Date.now }, // create index
});

module.exports = mongoose.model('Orders', paymentsSchema);
