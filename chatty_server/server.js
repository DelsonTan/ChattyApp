const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        // Broadcast to everyone
        wss.clients.forEach(function each(client) {
            let broadcastData = {
                id: uuidv4(),
                username: parsedData.username,
                content: parsedData.content
            };
            broadcastData = JSON.stringify(broadcastData);
            client.send(broadcastData);
         })
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});
