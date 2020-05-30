console.log('Hello World!');
// Make WebSocket connection
// We have access to 'io' since we have linked the socket.io library
let socket = io.connect('http://localhost:8080');

let p = document.getElementById('log');
let buildBtn = document.getElementById('btn');

btn.addEventListener('click', () => {
    socket.emit('buildImage', {
        message: 'Build the Dockerfile!'
    });
});

socket.on('stdout', data => {
    console.dir(data);
    p.innerHTML += data + "<br />";
})
