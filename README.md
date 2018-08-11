ChattyApp
=====================

A chat application that allows multiple users to communicate with each other. A user can send messages, see all messages that have been posted to the server, and see notifications for when a user has joined or left the server, or changed their names. 

On the front end, this application uses the React library, and supplementary tools for Node including Webpack and Babel. On the back end, the server uses Express for routes and WebSockets for multi-user real-time updates.

### Usage

Clone this repository and create your own git repo.

```
git clone git@github.com:DelsonTan/ChattyApp.git chattyapp
cd chattyapp
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the front-end server.

```
npm install
npm start
open http://localhost:3000
```

Open another terminal window/tab. Change directories to the back-end server, install dependencies and start the back-end server.

*In a separate terminal window/tab, starting at the project's root directory*
```
cd chatty_server
npm install
npm start
```

### Dependencies

Front End
* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [SASS] (https://sass-lang.com/install)

Back End
* Express
* WebSocket
* UUID 

