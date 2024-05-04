import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import { PiUserCircleFill } from "react-icons/pi";
import io from 'socket.io-client';

const socket = io(process.env.BACKEND_URL);

export const Chat = () => {
    const { store, actions } = useContext(Context);
    const [message, setMessage] = useState('');
    const [friends, setFriends] = useState([]);
    const [friend, setFriend] = useState({});
    const [chat, setChat] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const userId = store.userToken.identity.id;


    useEffect(() => {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [message, chat]);

    useEffect(() => {
        if (!store.userToken) {
            navigate('/login');
        }
        socket.emit('join', { sender_id: userId, room: id });
        const getMessages = async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_URL}/api/get_messages/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + store.userToken.token,
                        }
                    }
                );
                const data = await res.json();
                setChat(data);
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        }
        getMessages();
        setFriend(store.currentFriend);
        console.log(store.currentFriend);
    }, [id]);

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_URL}/api/get_friends`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + store.userToken.token,
                        }
                    }
                );
                const data = await res.json();
                setFriends(data);
            } catch (error) {
                console.error("Error fetching friends", error);
            }
        }
        getFriends();
    }, []);

    useEffect(() => {
        socket.on('message', function (data) {
            setChat([...chat, data]);
        });
    });

    const handleSend = async () => {
        try {
            socket.emit('message', { sender_id: userId, room: id, message: message });
            setMessage('');
        } catch (error) {
            console.error("Error sending message", error);
        }
    }

    const handleChat = (friendId) => async () => {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}/api/get_chat/${friendId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.userToken.token,
                    }
                }
            );
            const data = await res.json();
            store.currentFriend = data.user;
            navigate(`/chat/${data.chat_id}`);
        } catch (error) {
            console.error("Error fetching chat", error);
        }
    }

    return (
        <div className="p-2 flex border-8" style={{ height: '80vh' }}>
            <div className="border-10 w-3/12">
                <div className="flex justify-between">
                    <h3>Usuarios</h3>
                    <Link to="/usercourse" className="p-2 bg-blue-500 text-white">Volver</Link>
                </div>
                <ul className="list-group">
                    {friends.map((user, index) => (
                        <li key={index} className="list-group-item my-3">
                            <button className='flex items-center' onClick={handleChat(user.id)}>
                                {user.image ? <img className="rounded-full w-12 h-12 object-cover" src={user.image} /> : <PiUserCircleFill className='text-5xl' />}
                                {user.username}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col w-9/12">
                <h3 className='flex items-center m-3'> {friend.image ? <img className="rounded-full w-12 h-12 object-cover" src={friend.image} /> : <PiUserCircleFill className='text-5xl' />}
                    {friend.username}</h3>
                <div id="chat-box" className="flex-grow-1 border-bottom border-2 p-3 h-full" style={{ overflowY: 'auto' }}>
                    {chat.map((msg, index) => (
                        <div key={index} className={`grid rounded-t-3xl ${msg.sender_id === userId ? 'rounded-r-3xl' : 'rounded-l-3xl'}`}>
                            <div className={`m-2 p-2 rounded-t-3xl ${msg.sender_id === userId ? 'rounded-l-3xl bg-green-200 justify-self-end' : 'rounded-r-3xl bg-blue-200 justify-self-start'}`}>
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input type="text" className='w-full' value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button className="p-2 bg-blue-500 text-white" onClick={handleSend}>Enviar</button>
                </div>
            </div>
        </div>
    );
}