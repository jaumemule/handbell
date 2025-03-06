// represents the payment towards the payment provider

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define the schema for our user model
var paymentsSchema = mongoose.Schema({
    _merchantId : { type: Schema.Types.ObjectId, ref: 'Merchants', default: null },
    sessionId: String,
    state: {type: String, default: 'payment_started'}, // events (or states): payment_started, payment_confirmed,
    tableNumber: Number,
    deviceId: String,
    totalPrice: Number,
    tip: Number,
    orders: Object,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payments', paymentsSchema);
