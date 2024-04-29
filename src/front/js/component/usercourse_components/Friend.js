import React from 'react';
import { PiUserCircleFill } from 'react-icons/pi';

const Friend = ({ friend, index, handleChat, buttonInfo }) => {
    return (
        <div key={index} className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
            <div className='flex items-center'>
                {friend.image ? <img className='rounded-full w-12 h-12 object-cover' src={friend.image} alt="Friend Avatar" /> : <PiUserCircleFill className='text-5xl' />}
                <p className='ms-1'>{friend.username}</p>
            </div>
            <button
                className='bg-red-400 p-2 rounded-lg text-white text-xs h-10'
                onClick={() => handleChat(friend.id)}
            >
                {buttonInfo}
            </button>
        </div>
    );
};

export default Friend;