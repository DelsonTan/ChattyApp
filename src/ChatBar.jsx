import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const onSubmit = event => {
      event.preventDefault();
      const usernameField = event.target.elements.username.value || "Anonymous";
      const messageField = event.target.elements.message.value;

      if (this.props.name !== usernameField) {
        this.props.postNotification(this.props.name, usernameField);
      }

      if (messageField !== "") {
        this.props.postMessage(usernameField, messageField);
        event.target.elements.message.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <form onSubmit={onSubmit}>
          <input className="chatbar-username" name="username" placeholder="Your Name (Optional)"/>
          <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER"/>
          <input type="submit" style={{display: "none"}}/>
        </form>
      </footer>
    );
  }
}
export default ChatBar;