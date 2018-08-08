import React, { Component } from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {

  // User colors!
  get userColors() {
    return {
      type: "user-colors",
      colors: ["#241E4E", "#ED9B40", "#8F2D56", "#960200"]
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Anonymous",
        colorIndex: 0 // colors[index]
      },
      usersCount: 0,
      messages: []
    };
    this.postNotification = this.postNotification.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  postNotification(oldUser, newUser) {
    const currentUser = this.state.currentUser;
    currentUser.name = newUser;
    this.setState({ currentUser: currentUser });
    this.socket.send(JSON.stringify({ type: "postNotification", oldUsername: oldUser, newUsername: newUser }))
  }

  postMessage(newUser, newContent) {
    const newMessage = {
      type: "postMessage",
      username: newUser,
      usercolor: this.userColors.colors[this.state.currentUser.colorIndex],
      content: newContent
    };
    console.log(newMessage)
    this.socket.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (event) => {
      this.socket.send(JSON.stringify(this.userColors));
    }
    this.socket.onmessage = event => {
      const serverData = JSON.parse(event.data);
      if (serverData.type === "this-user-joined") {
        const currentUser = this.state.currentUser;
        currentUser.colorIndex = serverData.userColorIndex;
        this.setState({
          currentUser: currentUser,
          usersCount: serverData.usersCount,
          messages: serverData.messageHistory
        })
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
        <NavBar usersCount={this.state.usersCount} />
        <MessageList messages={this.state.messages} />
        <ChatBar name={this.state.currentUser.name} postMessage={this.postMessage} postNotification={this.postNotification} />
      </div>
    );
  }
}
export default App;
