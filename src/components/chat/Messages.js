import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useSubscription } from "react-stomp-hooks";
import { useEffect } from "react";
import { getMessages } from "../../api/ChatApi";
import { getImageUser } from "../../api/ImageApi";

const Messages = () => {
  const authContext = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isInitialCall, setInitialCall] = useState(true);
  const [isLoading, setLoading] = useState(true);
  let count = 0;

  useSubscription("/topic/group", (message) => onMessageReceived(message.body));

  useEffect(() => {
    if (!isInitialCall) {
      return;
    }
    setInitialCall(false);
    getMessages(authContext.getUser())
      .then((response) => response.data)
      .then(async (response) => {
        response.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        for (const value of response) {
          const content = value.content;
          const sender = value.sender;
          await imgFinder(content, sender);
        }
        setLoading(false);
      });
    async function imgFinder(content, sender) {
      await getImageUser(sender, authContext.getUser())
        .then((response) => response.data)
        .then((response) => {
          let jsonVersion = null;
          if (response.toLowerCase() === "not found") {
            jsonVersion = {
              sender: sender,
              content: content,
              img: null,
            };
          } else {
            jsonVersion = {
              sender: sender,
              content: content,
              img: response,
            };
          }
          const updatedMessages = messages;
          updatedMessages.push(JSON.stringify(jsonVersion));
          setMessages(updatedMessages);
        });
    }
  }, [messages]);

  const onMessageReceived = async (msg) => {
    async function imgFinder(content, sender) {
      await getImageUser(sender, authContext.getUser())
        .then((response) => response.data)
        .then((response) => {
          let jsonVersion = null;
          if (response.toLowerCase() === "not found") {
            jsonVersion = {
              sender: sender,
              content: content,
              img: null,
            };
          } else {
            jsonVersion = {
              sender: sender,
              content: content,
              img: response,
            };
          }
          setMessages(messages.concat(JSON.stringify(jsonVersion)));
        });
    }

    imgFinder(JSON.parse(msg).content, JSON.parse(msg).sender);
  };

  const renderMessage = (message) => {
    const { sender, content, img } = JSON.parse(message);
    const messageFromMe = authContext.getUser().data.sub === sender;
    const className = messageFromMe
      ? "messages-message currentUser"
      : "messages-message";
    if (img === null || img === undefined) {
      return (
        <li className={className} key={count++}>
          <div className="text-avatar">
            <span>{sender && sender[0].toUpperCase()}</span>
          </div>
          <div className="message-content">
            <div className="username">{sender}</div>
            <div className="text">{content}</div>
          </div>
        </li>
      );
    } else {
      return (
        <li className={className} key={count++}>
          <img className="avatar" src={`data:image/jpeg;base64,${img}`}></img>
          <div className="message-content">
            <div className="username">{sender}</div>
            <div className="text">{content}</div>
          </div>
        </li>
      );
    }
  };

  if (isLoading) {
    return (
      <div className="chat-messages-body">
        <div className="chat-messages-container">
          <div className="container">Loading...</div>
        </div>
      </div>
    );
  } else {
    return (
      <ul className="messages-list">
        {messages.map((msg) => renderMessage(msg))}
      </ul>
    );
  }
};

export default Messages;
