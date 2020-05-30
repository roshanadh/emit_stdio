console.log('Hello World!');
// Make WebSocket connection
// We have access to 'io' since we have linked the socket.io library
let socket = io.connect('http://localhost:8080');
io.disconnect();