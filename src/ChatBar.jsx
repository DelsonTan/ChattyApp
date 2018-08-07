import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const usernameInput = event.target.elements.username.value || "Anonymous";
      const messageInput = event.target.elements.message.value;
      console.log("username:", usernameInput)
      console.log("message:", messageInput);

      this.props.addMessage(usernameInput, messageInput);
    }

    return (
      <footer className="chatbar">
        <form onSubmit={onSubmit}>
          <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" />
          <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
          <button type="submit">Submit</button>
        </form>
      </footer>
    );
  }
}
export default ChatBar;