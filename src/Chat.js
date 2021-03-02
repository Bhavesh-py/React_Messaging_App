import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchSharp, Send } from '@material-ui/icons';
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import "./Chat.css";
import db from './firebase';
import {useStateValue} from "./StateProvider"
import firebase from "firebase";

function Chat() {
    
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {chatId} = useParams();
    const [chatName, setChatName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] =  useStateValue();

    useEffect(() => {
        if (chatId) {
            db.collection('chats').doc(chatId).onSnapshot(snapshot => (setChatName(snapshot.data().name)
            ));

            db.collection('chats')
            .doc(chatId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => 
            setMessages (snapshot.docs.map((doc) => doc.data()))
            );
        }
    }, [chatId]);

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000));
    }, [chatId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("here it is", input);

        db.collection('chats')
        .doc(chatId)
        .collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    return (
        
        <div className="chat">
            <div className='chat_header'>
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
                <div className='chat_headerInfo'>
                <h2>{chatName}</h2>
                <p>last seen {" "} 
                {new Date(
                    messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                } </p>
                </div>

                <div className='chat_headerRight'>
                <IconButton>
                        <SearchSharp />
                    </IconButton>
                    
                    <IconButton>
                        <AttachFile />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
                
            </div>

            <div className='chat_body' >
                {messages.map((message) => (
                    <p className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
                    <span className='chat_name'>
                        {message.name}
                    </span>
                        {message.message}
                    <span className='chat_timestamp'>
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
                

            </div>

            <div className='chat_footer'>
                <IconButton>
                <InsertEmoticon />
                </IconButton>

                <form>
                    <input type='text' value={input} onChange={e => setInput(e.target.value)}  placeholder='Type message here'/>
                    <button onClick={sendMessage} type='submit'>
                        <Send />
                    </button>
                    
                </form>
                
                <IconButton>
                <Mic />
                </IconButton>
                

            </div>

        </div>
    )
}

export default Chat
