import React, { useState, useContext, useEffect } from 'react';
import Input from './Input';
import Messages from './Messages';
import { sendMessage } from '../../api/ChatApi';
import AuthContext from '../../context/AuthContext';
import { StompSessionProvider } from 'react-stomp-hooks';
import { toast } from 'react-hot-toast';
import './Chat.css';

const Chat = () => {
    const authContext = useContext(AuthContext);
    const [isLoading, setLoading] = useState(true);
    const [token, setToken] = useState('');
    const [socketURL, setSocketURL] = useState('');

    useEffect(() => {
        if (authContext.getUser() == null) {
            return;
        }
        authContext.userIsAuthenticated(true);
        setToken(authContext.getUser().token);
    }, [authContext.user]);

    useEffect(() => {
        if (token === '') {
            return;
        }
        setSocketURL(`ws://localhost:8080/ws-chat?access_token=${token}`);
        setLoading(false);
    }, [token])

    const onConnected = (event) => {
        console.log("Connected!!");
    }

    const onSendMessage = (msgText) => {
        sendMessage(authContext.getUser(), msgText)
            .catch(err => {
                toast('Error Occured while sending message to api', {
                    duration: 5000
                });
                console.log(err);
            })
    }

    if (isLoading) {
        return (
            <div className="chat-body">
                <div className="chat-container">
                    <div className="container">
                        Loading...
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="chat">
                <StompSessionProvider
                    url={socketURL}
                    onConnect={onConnected}>
                    <Messages />
                </StompSessionProvider>
                <Input onSendMessage={onSendMessage} />
            </div>
        )
    }
}

export default Chat;