import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Chat = () => {
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([
        {
            "email": "joseman6575@gmail.com",
            "first_name": "Jos\u00e9 Manuel",
            "id": 1,
            "image": null,
            "last_name": "S\u00e1nchez Villegas",
            "learning_language": 2,
            "lives": 100,
            "native_language": 1,
            "streak": 0,
            "username": "josema"
        },
        {
            "email": "andy@gmail.com",
            "first_name": "andres",
            "id": 2,
            "image": null,
            "last_name": "gamboa",
            "learning_language": 1,
            "lives": 100,
            "native_language": 2,
            "streak": 0,
            "username": "andy"
        }
    ]);
    const [chat, setChat] = useState([
        {
            "msg": "hola",
            "id_usuario_que_manda": 2,
            "hora": "12:00"
        },
        {
            "msg": "como estas",
            "id_usuario_que_manda": 1,
            "hora": "12:30"
        },
        {
            "msg": "bien",
            "id_usuario_que_manda": 2,
            "hora": "1:00"
        },
        {
            "msg": "y tu",
            "id_usuario_que_manda": 2,
            "hora": "1:10"
        },
        {
            "msg": "tambien",
            "id_usuario_que_manda": 1,
            "hora": "1:15"
        },
        {
            "msg": "adios",
            "id_usuario_que_manda": 2,
            "hora": "1:20"
        },
        {
            "msg": "adios",
            "id_usuario_que_manda": 1,
            "hora": "1:25"
        },
        {
            "msg": "hola",
            "id_usuario_que_manda": 2,
            "hora": "12:00"
        },
        {
            "msg": "como estas",
            "id_usuario_que_manda": 1,
            "hora": "12:30"
        },
        {
            "msg": "bien",
            "id_usuario_que_manda": 2,
            "hora": "1:00"
        },
        {
            "msg": "y tu",
            "id_usuario_que_manda": 2,
            "hora": "1:10"
        },
        {
            "msg": "tambien",
            "id_usuario_que_manda": 1,
            "hora": "1:15"
        },
        {
            "msg": "adios",
            "id_usuario_que_manda": 2,
            "hora": "1:20"
        },
        {
            "msg": "adios",
            "id_usuario_que_manda": 1,
            "hora": "1:25"
        }
    ]);

    const user = users[0];

    useEffect(() => {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [chat]);

    const handleSend = () => {
        if (message.trim() === '') return;
        setChat([...chat, {
            "msg": message,
            "id_usuario_que_manda": user.id,
            "hora": new Date().toLocaleTimeString()
        }]);
        setMessage('');
    }

    return (
        <div className="p-2 d-flex border-10" style={{ height: '80vh' }}>
            <div className="col-3 border-end border-2">
                <h3>Amigos</h3>
                <ul className="list-group">
                    {users.map((user, index) => (
                        <li key={index} className="list-group-item">
                            <Link to={`/chat/${user.id}`}>{user.username}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-9 d-flex flex-column">
                <div id="chat-box" className="flex-grow-1 border-bottom border-2 p-3" style={{ overflowY: 'auto' }}>
                    {chat.map((msg, index) => (
                        <div key={index} className={`d-flex rounded-t-3xl ${msg.id_usuario_que_manda === user.id ? 'justify-content-end rounded-r-3xl ' : 'justify-content-start rounded-l-3xl'}`}>
                            <div className={`m-2 p-2 rounded-t-3xl justify-content-start ${msg.id_usuario_que_manda === user.id ? 'rounded-l-3xl bg-green-200' : 'rounded-r-3xl bg-blue-200'}`}>
                                {msg.msg}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex">
                    <input type="text" className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button className="btn btn-primary" onClick={handleSend}>Enviar</button>
                </div>
            </div>
        </div>
    );
}