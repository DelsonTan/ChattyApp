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

  addMessage(username, content) {
    const oldMessages = this.state.messages;
    const newMessage = {
      username: username,
      content: content
    };
    const newMessages = oldMessages.push(newMessage);
    this.setState({messages: newMessages})
  }
  
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
