import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import db from './firebase';
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
        db.collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => 
        setMessages(snapshot.docs.map((doc) => doc.data())))   
        }
    }, [])

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000));
    }, []);


    function createChat() {
        const chatName = prompt("Enter the name of the new chat!");

        if(chatName) {
            db.collection("chats").add({
                name: chatName,
            });
        }
    };

    return !addNewChat ? (
        <Link to={`/chats/${id}`}>
            <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
            <div className='sidebarChat_info' >
                <h2>{name}</h2>
                <p>{messages[0]?.message} </p>
            </div>
            </div>
        </Link>
    ) : (
        <div onClick = {createChat} className = 'sidebarChat'>
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
