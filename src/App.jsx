import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      usersCount: 0,
      messages: []
    };
    this.postNotification = this.postNotification.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  postNotification(oldUser, newUser) {
    this.setState({ currentUser: { name: newUser } });
    this.socket.send(JSON.stringify({ type: "postNotification", oldUsername: oldUser, newUsername: newUser }))
  }

  postMessage(newUser, newContent) {
    const newMessage = {
      type: "postMessage",
      username: newUser,
      content: newContent
    };
    // const updatedMessages = this.state.messages.concat(newMessage);
    this.socket.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onmessage = event => {
      const serverData = JSON.parse(event.data);
      if (serverData.type === "this-user-joined") {
        this.setState({ usersCount: serverData.usersCount, messages: serverData.messageHistory })
      }
      if (serverData.type === "user-joined") {
        const updatedMessages = this.state.messages.concat(serverData);
        this.setState({ usersCount: serverData.usersCount, messages: updatedMessages });
      }
      if (serverData.type === "user-left") {
        const updatedMessages = this.state.messages.concat(serverData);
        this.setState({ usersCount: serverData.usersCount, messages: updatedMessages });
      }
      if (serverData.type === "message" || serverData.type === "notification") {
        const updatedMessages = this.state.messages.concat(serverData);
        this.setState({ messages: updatedMessages });
      }
    }
  }

  render() {

    return (
      <div>
        <NavBar usersCount={this.state.usersCount}/>
        <MessageList messages={this.state.messages} />
        <ChatBar name={this.state.currentUser.name} postMessage={this.postMessage} postNotification={this.postNotification} />
      </div>
    );
  }
}
export default App;
