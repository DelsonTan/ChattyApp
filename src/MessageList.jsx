import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        console.log(this.props);
        const messageItems = this.props.messages.map((message) => (
            <Message key={message.key} username={message.username} content={message.content} />
        ));
        return (
            <main className="messages">
                {messageItems}
                <div className="message system">
                    Anonymous1 changed their name to nomnom.
            </div>
            </main>
        );
    }
}
export default MessageList;