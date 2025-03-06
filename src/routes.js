const menu = require('./controllers/menuController');
const orders = require('./controllers/ordersController');
const merchants = require('./controllers/merchantsController');
const translations = require('./controllers/translationsController');
const invoices = require('./controllers/invoicesController');
const loginAttemptsMiddleware = require('./application/loginAttemptsMiddleware');
const userController = require('./controllers/userController');
const deviceController = require('./controllers/deviceController');
const userTokenVerification = require('./application/userToken')

module.exports = function(app) {
    
    const payments = require('./controllers/paymentsController');

    // generic public
    app.get('/api/v1/health', (req, res) => res.send('OK'));
    app.get('/api/v1/device-id', deviceController.generate);
    app.get('/api/v1/menu/:merchantId/:tableNumber', menu.getByMerchantIdAndPersistSession); // for customers
    app.get('/api/v1/merchant-menu/:merchantId', menu.getByMerchantId); // for merchants
    app.get('/api/v1/merchant/:merchantId', merchants.retrieve);
    app.get('/api/v1/shoppers-translations', translations.shoppers);

    // merchant admin
    app.patch('/api/v1/menu-item/activate/:itemId', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, menu.makeItemActive);
    app.patch('/api/v1/menu-item/activate/:itemId', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, menu.makeItemActive);
    app.patch('/api/v1/menu-item/deactivate/:itemId', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, menu.makeItemInActive);
    app.patch('/api/v1/merchant/:merchantId/open-close', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, merchants.openClose);
    app.post('/api/v1/menu/:merchantId', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, menu.createItemForMerchant);
    app.patch('/api/v1/order-preparing/:orderId', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, orders.setAsPreparing);
    app.patch('/api/v1/order-delivered/:orderId', userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject, orders.setAsDelivered);

    // HandBell Admin
    app.post('/api/v1/merchant', merchants.create);

    // MIDDLEWARE AUTHENTICATION SERVICES
    app.post(
        '/api/v1/user-registration',
        loginAttemptsMiddleware.isUserReachingTheLimitOfRegistrationAttempts,
        userController.register,
    );
    app.get(
        '/api/v1/user-registration-confirmation/:userId/:hash',
        userController.registerConfirm,
    );

    app.post('/api/v1/change-password-generate', userController.changePasswordGenerate);
    app.post(
        '/api/v1/change-password-confirmation/:userId/:hash',
        userController.changePasswordConfirm,
    );

    app.post(
        '/api/v1/user-login',
        loginAttemptsMiddleware.isUserReachingTheLimitOfLoginAttempts,
        userController.login,
    );
    app.post(
        '/api/v1/user-logout',
        userTokenVerification.verifyTokenAndSetDecryptedUserToRequestObject,
        userController.logout,
    );


    // shoppers admin
    // app.get('/api/v1/open-orders/:merchantId', orders.getOpenOrdersByMerchantId); // NOT IN USE, not secured

    app.get('/api/v1/orders/:merchantId', orders.currentDayOrders);

    // step 1 create payment
    app.post('/api/v1/payment/:merchantId/:tableNumber', payments.create);

    // step 2 confirm payment
    app.post('/api/v1/payment-callback', payments.paymentProviderCallback);

    // state of the payment
    app.get('/api/v1/payment/:paymentId', payments.getById);

    // state of the payment
    app.get('/api/v1/invoice/:paymentId', invoices.getByPaymentId);

    app.get('/merchants-orders', function(req, res) {
        res.sendFile(__dirname + '/public/merchants-orders.html');
    });

    app.get('/merchants-menu', function(req, res) {
        res.sendFile(__dirname + '/public/merchants-menu.html');
    });

    app.get('/merchants-qr', function(req, res) {
        res.sendFile(__dirname + '/public/merchants-qr.html');
    });

    app.get('/shoppers', function(req, res) {
        res.sendFile(__dirname + '/public/shoppers.html');
    });

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public/landing.html');
    });

    app.get('/login', function(req, res) {
        res.sendFile(__dirname + '/public/merchant-login.html');
    });

    app.get('/.well-known/apple-developer-merchantid-domain-association', function(req, res) {
        res.sendFile(__dirname + '/public/apple-developer-merchantid-domain-association');
    });

    app.get('/merchants-create-menu-items', function(req, res) {
        res.sendFile(__dirname + '/public/merchants-create-menu-items.html');
    });
};
