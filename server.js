// server.js

// set up ======================================================================
// get all the tools we need
const express = require('express');
const app = express();
const port = process.env.PORT || 3005;
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const enforceProtocol = require('express-sslify');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const socketProvider = require('./src/services/socketProvider')

// configuration ===============================================================
let uri = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/handbell_db';
console.log(process.env.MONGO_CONNECTION)
console.log(uri)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}); // connect to our database

mongoose.set('useFindAndModify', false);

socketProvider.stablish(io) // socket connection

app.use(compression());
app.use(cors());

// Use enforce.HTTPS({ trustProtoHeader: true }) in case you are behind
// a load balancer (e.g. Heroku). See further comments below
if (process.env.NODE_ENV === 'production') {
    app.use(enforceProtocol.HTTPS({ trustProtoHeader: true }));
}

app.use(bodyParser.json({strict: true}));
app.use(bodyParser.urlencoded({extended: true}));

// TODO limit this in production
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(express.static(__dirname + '/src/public'));

app.use('/qr-codes', express.static(__dirname + '/node_modules/qrcode-generator/'));

// routes ======================================================================
require('./src/routes.js')(app, io); // load our routes

// routes ======================================================================
require('./src/sockets.js')(app, io); // load our sockets

// launch ======================================================================
server.listen(port);
console.log('The esmecma happens on port ' + port + ' and env ' + process.env.NODE_ENV);
