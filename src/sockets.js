// const orders = require('./controllers/orders');

module.exports = function(app, io) {
    io.on("connection", (socket) => {
        socket.on("join", async (gameId) => {
            try {
                let result = await collection.findOne({ "_id": gameId });
                if(!result) {
                    await collection.insertOne({ "_id": gameId, messages: [] });
                }
                socket.join(gameId);
                socket.emit("joined", gameId);
                socket.activeRoom = gameId;
            } catch (e) {
                console.error(e);
            }
        });
        socket.on("message", (message) => {});
    });
};
