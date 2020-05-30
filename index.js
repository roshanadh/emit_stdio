const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = app.listen(8080, () => {
    console.log('Server is now listening on port 8080');
});

const io = socket(server);

// Need to setup socket.io on the client (frontend) as well ...
// ... for the 'connection' event to fire
io.on('connection', socket => {
    console.log(`Connect: New socket connection: ${socket.id}`);
    socket.on('disconnect', reason => {
        console.log(`Disconnect: Socket ${socket.id} has disconnected.\nReason: ${reason}\n`)
    });
});
