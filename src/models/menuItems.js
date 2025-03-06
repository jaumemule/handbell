const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define the schema for our user model
var menuSchema = mongoose.Schema({
    _merchantId : { type: Schema.Types.ObjectId, ref: 'Merchants', default: null },
    title: String,
    description: Object, // language : text [Tupple list]
    active: {type: Boolean, default: true},
    price: Number, // value in cents
    priority: {type: Number, default: 1000}, // to sort the menu (no priority defined by default)
    currency: {type: String, default: 'EUR'},
    numberAvailable: {type: Number, default: null}, // in case there is a limit of items
    category: {type: String, default: 'drink'}, // drink / food / merch
    subCategory: {type: String, default: null}, // beer / coffe / tea / pizza ... they are reflected in translations
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MenuItems', menuSchema);
