import React, { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useSubscription } from 'react-stomp-hooks';

const Messages = () => {
    const authContext = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    let count = 0;

    useSubscription("/topic/group", (message) => onMessageReceived(message.body));
    console.log("HERE!");

    const onMessageReceived = (msg) => {
        console.log(msg);
        setMessages(messages.concat(msg));
    }

    const renderMessage = (message) => {
        const { sender, content } = JSON.parse(message);
        const messageFromMe = authContext.getUser().data.sub === sender;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className} key={count++}>
                <span
                    className="avatar"
                    style={{ backgroundColor: "red" }}
                />
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{content}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}


export default Messages