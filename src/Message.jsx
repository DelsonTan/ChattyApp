import React, { Component } from 'react';

class Message extends Component {

  render() {
    if (this.props.type === "user-joined") {
      return (<div className="message system">
            Anonymous has joined the channel.
            </div>)
    }

    if (this.props.type === "user-left") {
      return (<div className="message system">
            Anonymous has left the channel.
            </div>)
    }

    if (this.props.type === "message") {
      return (
        <div className="message" key={this.props.id}>
          <span className="message-username" style={{color: this.props.usercolor}}>{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    }

    if (this.props.type === "notification") {
      return (<div className="message system">
        {this.props.oldUsername} changed their name to {this.props.newUsername}.
      </div>)
    }

  }
}
export default Message;