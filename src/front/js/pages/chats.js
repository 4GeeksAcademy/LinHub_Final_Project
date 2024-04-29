import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Chat = (id) => {
    const { store, actions } = useContext(Context);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const chatBox = document.getElementById('chat-box');
        chatBox.scrollTop = chatBox.scrollHeight;
    }, [message, chat]);

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