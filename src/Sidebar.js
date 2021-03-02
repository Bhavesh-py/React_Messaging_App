import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLargeSharp, MoreVert, Search} from '@material-ui/icons';
import React, {useState, useEffect} from 'react';
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from './StateProvider';

function Sidebar() {

const [chats, setChats] = useState([]);
const [{user},dispatch] = useStateValue();

useEffect(() => {
    db.collection('chats').onSnapshot(snapshot => (
        setChats(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
        })
        ))
    ));
}, [])


    return (
        <div className='sidebar'>

            <div className='sidebar_header'>
                <Avatar src={user?.photoURL} />

                <div className='sidebar_header_right'>
                    <IconButton>
                        <DonutLargeSharp />
                    </IconButton>
                    
                    <IconButton>
                        <Chat />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>
                    
                </div>

            </div>
            <div className='sidebar_search'>

                <div className='search_container' >
                <Search/>
                <input placeholder="Search or start a new chat" type='text' />
                </div>
                
            </div>

            <div className='sidebar_chats'>
                <SidebarChat addNewChat/>
                {chats.map(chat => (
                    <SidebarChat key={chat.id} id={chat.id} name = {chat.data.name} />
                ))}


            </div>

        </div>
    )
}

export default Sidebar
