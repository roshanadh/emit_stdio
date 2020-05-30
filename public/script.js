console.log('Hello World!');
// Make WebSocket connection
// We have access to 'io' since we have linked the socket.io library
let socket = io.connect('http://localhost:8080');

let p = document.getElementById('messageElement');
let btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    socket.emit('clientEmit', {
        message: 'Hello Server!'
    });
});

socket.on('serverEmit', data => {
    p.innerHTML = `Message from server: ${data.message}`;
});

socket.on('stdout', data => {
    console.dir(data);
})
