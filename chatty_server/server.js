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

// Array of possible user colors
const userColors = ["#241E4E", "#3DA35D", "#ED9B40", "#8F2D56", "#960200"];
let totalColors = userColors.length;
let colorCounter = 0;
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');
    // clients.push(ws);

    // Data to send to users upon user connecting
    let newUserMessage = {
        id: uuidv4(),
        type: "user-joined",
        usersCount: wss.clients.size
    };

    let dataForNewUser = {
        type: "this-user-joined",
        usersCount: wss.clients.size,
        messageHistory: messageHistory,
        userColor: userColors[colorCounter]
    };

    // Last color in array of colors
    if (colorCounter === (totalColors - 1)) {
        colorCounter = 0;
    } else {
        colorCounter++;
    }

    messageHistory.push(newUserMessage);

    // Broadcast to all clients that a new client has joined, and give new client the data it needs 
    wss.clients.forEach(function each(client) {
        // usersCount % colorCount
        if (client !== ws) {
            client.send(JSON.stringify(newUserMessage));
        } else { // Send data for new users, only to the new user
            client.send(JSON.stringify(dataForNewUser));
        }
    });

    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        // Data to send to users when a new chat message should be put in the message list   
        // Process data depending on the value of the type key
        if (parsedData.type === "postMessage") {
            let chatMessage = {};
            chatMessage.id = uuidv4();
            chatMessage.type = "message";
            chatMessage.username = parsedData.username;
            chatMessage.usercolor = parsedData.usercolor;
            chatMessage.content = parsedData.content;
            messageHistory.push(chatMessage);
            broadcastData = chatMessage;
        }
        if (parsedData.type === "postNotification") {
            let notificationMessage = {};
            notificationMessage.id = uuidv4();
            notificationMessage.type = "notification";
            notificationMessage.oldUsername = parsedData.oldUsername;
            notificationMessage.newUsername = parsedData.newUsername;
            messageHistory.push(notificationMessage);
            broadcastData = notificationMessage;
        }
        
        broadcastData = JSON.stringify(broadcastData);
        // Broadcast to everyone
        wss.clients.forEach(function each(client) {
            client.send(broadcastData);
        })
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        // Data to send to users upon user disconnecting
        let userLeftMessage = {
            id: uuidv4(),
            type: "user-left",
            usersCount: wss.clients.size
        };
        messageHistory.push(userLeftMessage);
        wss.clients.forEach(function each(client) {
            if (client !== ws) {
                client.send(JSON.stringify(userLeftMessage));
            }
        });
    });
});
