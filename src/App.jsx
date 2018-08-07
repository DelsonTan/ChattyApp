import React, { Component } from 'react';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  render() {

    return (
      <div>
        <h1>ChattyApp 🤗</h1>
        <MessageList messages={this.state.messages} />
        <ChatBar name={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
