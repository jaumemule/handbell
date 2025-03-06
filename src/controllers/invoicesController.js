const hbs = require('handlebars');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const Payments = require('../models/payments.js');

hbs.registerHelper("beautifyPrice", function(price) {
    const newPrice = price /= 100
    return newPrice.toFixed(2)
});

hbs.registerHelper("beautifyDate", function(dateStr) {
    let date = new Date(dateStr);

    let month = parseInt(date.getMonth()) + 1;

    if (month < 9) {
        month = '0' + month
    }
    let day = date.getDate();

    if (day < 9) {
        day = '0' + day
    }
    return day + '-' + month + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
});

const compile = async function(data) {
    const filePath = path.join(__dirname, '..', 'application', 'templates', 'invoice.hbs');
    const html = fs.readFileSync(filePath, 'utf-8');
    return hbs.compile(html)(data);
}

async function generate(data) {
    const content = await compile(data);
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(content);
    const pdfBuffer = await page.pdf()
    await page.close();
    await browser.close();
    return pdfBuffer
}

async function getOrdersByPaymentId(paymentId) {
    try {
        return payment = await Payments
            .findOne({_id: paymentId})
            .populate('_merchantId')
            .lean() // otherwise handlebars will break (stupid js and its things...)
            .exec();
    } catch (err) {
        return null
    }
}

(module.exports = {
    getByPaymentId: function(req, res, next) {
        getOrdersByPaymentId(req.params.paymentId).then((data) => {
            generate(data).then((content) => {
                res.set("Content-Type", "application/pdf");
                res.send(content);
            })
        })
    },
});
