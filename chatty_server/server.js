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

// Collection of currently connected clients
// let clients = [];

// messageHistory, normally stored by some kind of database
let messageHistory = [];

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    // clients.push(ws);
    wss.clients.forEach(function each(client) {
        if (client !== ws) {
            let newUserMessage = {
                id: uuidv4(),
                type: "user-joined",
                usersCount: wss.clients.size
            };
            messageHistory.push(newUserMessage);
            client.send(JSON.stringify(newUserMessage));
        } else {
            let newUserData = {
                type: "this-user-joined",
                usersCount: wss.clients.size,
                messageHistory: messageHistory
            };
            client.send(JSON.stringify(newUserData));
        }
    });

    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        // Process data depending on the value of the type key
        let chatMessage = {};

        chatMessage.id = uuidv4();
        if (parsedData.type === "postMessage") {
            chatMessage.type = "message";
            chatMessage.username = parsedData.username;
            chatMessage.content = parsedData.content;
        }
        if (parsedData.type === "postNotification") {
            chatMessage.type = "notification";
            chatMessage.oldUsername = parsedData.oldUsername;
            chatMessage.newUsername = parsedData.newUsername;
        }
        messageHistory.push(chatMessage);

        const messageData = JSON.stringify(chatMessage);
        // Broadcast to everyone
        wss.clients.forEach(function each(client) {
            client.send(messageData);
        })
    });

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected');
        wss.clients.forEach(function each(client) {
            //     if (client !== ws && client.readyState === WebSocket.OPEN) {
            let userLeftMessage = {
                id: uuidv4(),
                type: "user-left",
                usersCount: wss.clients.size
            };
            messageHistory.push(userLeftMessage);
            client.send(JSON.stringify(userLeftMessage));
            //     }
        });
    });
});
