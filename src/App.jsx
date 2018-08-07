import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" },
      messages: [
        {
          key: generateRandomId(),
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          key: generateRandomId(),
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage(newUser, newContent) {
    const newMessage = {
      key: generateRandomId(),
      username: newUser,
      content: newContent
    };
    const updatedMessages = this.state.messages.concat(newMessage);
    this.setState({ currentUser: newUser, messages: updatedMessages })
  };

  componentDidMount() {
    console.log("componentDidMount <App />");
    console.log(this.state);
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { key: 3, username: "Michelle", content: "Hello there!" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 3000);
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = event => this.socket.send("covfefe");
  }

  render() {

    return (
      <div>
        <h1>ChattyApp 🤗</h1>
        <MessageList messages={this.state.messages} />
        <ChatBar name={this.state.currentUser.name} addMessage={this.addMessage} />
      </div>
    );
  }
}
export default App;
