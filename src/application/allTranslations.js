const accepted = ['es', 'ca', 'en']
const defaultLanguage = 'en'
const parser = require('accept-language-parser');

let translations = {
    'food' : {
        'ca' : 'Menjar',
        'es' : 'Comida',
        'en' : 'Food',
    },
    'drinks' : {
        'ca' : 'Begudes',
        'es' : 'Bebidas',
        'en' : 'Drinks',
    },
    'order' : {
        'ca' : 'Cistella',
        'es' : 'Cesto',
        'en' : 'Basket',
    },
    'table' : {
        'ca' : 'Taula',
        'es' : 'Mesa',
        'en' : 'Table',
    },
    'modify' : {
        'ca' : 'Modifica',
        'es' : 'Modifica',
        'en' : 'Modify',
    },
    'add-tip' : {
        'ca' : 'Afegeix propina!',
        'es' : 'Añade propina!',
        'en' : 'Add a tip!',
    },
    'payment-methods' : {
        'ca' : 'Mètodes de pagament:',
        'es' : 'Métodos de pago:',
        'en' : 'Payment methods:',
    },
    'select-payment-method' : {
        'ca' : 'Seleccionar mètode de pagament',
        'es' : 'Seleccionar método de pago',
        'en' : 'Select payment method',
    },
    'loading' : {
        'ca' : 'Carregant...',
        'es' : 'Cargando...',
        'en' : 'Loading...',
    },
    'done' : {
        'ca' : 'Fet!',
        'es' : 'Hecho!',
        'en' : 'done!',
    },
    'checkout-tip' : {
        'ca' : 'La comanda serà servida tan aviat com sigui possible un cop efectuat el pagament.',
        'es' : 'El pedido será servida tan pronto como sea posible una vez efectuado el pago.',
        'en' : 'The order will be served as soon as possible once payment has been made.',
    },
    'sending' : {
        'ca' : 'L’encàrrec s’està enviant...',
        'es' : 'El encargo se está enviando...',
        'en' : 'The order is being sent...',
    },
    'do-not-leave-tip' : {
        'ca' : 'No marxis encara...',
        'es' : 'No te vayas todavía ...',
        'en' : 'Don\'t leave yet ...',
    },
    'order-received-tip' : {
        'ca' : 'Hem rebut la comanda!',
        'es' : 'Hemos recibido el pedido!',
        'en' : 'We received the order!',
    },
    'notify-while-ready-tip' : {
        'ca' : 'Et notificarem quan es comenci a preparar',
        'es' : 'Te notificaremos cuando se empiece a preparar',
        'en' : 'We will notify you when preparation begins',
    },
    'write-us-tip' : {
        'ca' : 'T’agrada el sistema? Escriu-nos a touch.handbell@gmail.com',
        'es' : 'Te gusta el sistema? Escríbenos a touch.handbell@gmail.com',
        'en' : 'Do you like the system? Write to us at touch.handbell@gmail.com',
    },
    'on-its-way-tip' : {
        'ca' : 'De camí!',
        'es' : 'De camino!',
        'en' : 'On its way!',
    },
    'enjoy-tip' : {
        'ca' : 'Gaudeix de la teva comanda!',
        'es' : 'Disfruta de tu pedido!',
        'en' : 'Enjoy your order!',
    },
    'something-failed' : {
        'ca' : 'Alguna cosa ha fallat :’(',
        'es' : 'Algo ha fallado: :’(',
        'en' : 'Something went wrong: :’(',
    },
    'check-with-restaurant' : {
        'ca' : 'Sisplau, comprova-ho amb el restaurant',
        'es' : 'Por favor, compruébalo con el restaurante',
        'en' : 'Please check it out with the restaurant',
    },
    'not-open-yet' : {
        'ca' : 'Encara no hem obert portes, prova-ho més tard :)',
        'es' : 'Aún no hemos abierto puertas, prueba más tarde :)',
        'en' : 'It is not possible to order yet, try it later :)',
    },
    'receipt' : {
        'ca' : 'Baixa el rebut',
        'es' : 'Baja el recibo',
        'en' : 'Download receipt',
    },
    // sub categories
    'pizza' : {
        'ca' : 'Pizzes',
        'es' : 'Pizzas',
        'en' : 'Pizza',
    },
    'beer' : {
        'ca' : 'Cerveses',
        'es' : 'Cervezas',
        'en' : 'Beers',
    },
    'tea' : {
        'ca' : 'Tes',
        'es' : 'Tés',
        'en' : 'Teas',
    },
    'coffe' : {
        'ca' : 'Cafès',
        'es' : 'Cafés',
        'en' : 'Coffes',
    },
    'tap' : {
        'ca' : 'Tirador',
        'es' : 'Tirador',
        'en' : 'Tap beer',
    },
}

module.exports = {
    all: function() {
        return translations
    },
    byTagAndLanguage: function(tag, lang) {
        return translations[tag][lang]
    },
}