import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        const messageItems = this.props.messages.map((message) => {
            // NOTE: skips over the message if it's not the right type
            if (message.type === "user-joined") {
                return (<Message key={message.id} type={message.type}/>);
            }
            if (message.type === "user-left") {
                return (<Message key={message.id} type={message.type}/>);
            }
            if (message.type === "message") {
                return (<Message key={message.id} type={message.type} username={message.username} content={message.content} />)
            }
            if (message.type === "notification") {
                return (<Message key={message.id} type={message.type} oldUsername={message.oldUsername} newUsername={message.newUsername} />)
            }
        })

        
        return (
            <main className="messages">
                {messageItems}
            </main>
        );
    }
}
export default MessageList;