const { v4: uuidv4 } = require('uuid');

let self = (module.exports = {
    generate: function(req, res) {
        return res.status(201).send({ deviceId: uuidv4() })
    }
})
