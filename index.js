const express = require('express');
const socket = require('socket.io');
const cp = require('child_process');

const app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile('index.html');
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

    socket.on('buildImage', data => {
        console.log(`Message from client: ${data.message}`);

        // Execute
        const build = cp.exec('docker build -t img_node .');

        build.stdout.on('data', data => {
            io.to(socket.id).emit('stdout', data.toString('utf-8'));
            console.log(data);
        });
    });
});
