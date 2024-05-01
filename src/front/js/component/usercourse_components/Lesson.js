import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

const Lesson = ({ index, name, description, id, button, userProgress, progressRequired }) => {
    const navigate = useNavigate()

    const currentUserProgress = userProgress.split(',').length - 1
    const [showButtoninfo, setShowButtonInfo] = useState(false)


    return (
        <>{currentUserProgress >= progressRequired ?
            <div className='relative usercourse-lesson' key={index}>
                <div className='lesson-background'>
                    <p className='text-white text-9xl'>{index + 1}</p>
                </div>
                <div className='px-4 flex flex-col'>
                    <p className='text-xl'>{name}</p>
                    <p className='text-slate-400'>{description ? description : ""}</p>
                </div>
                <div className='px-4 pb-2'>
                    <button
                        className='py-2 px-4 text-white bg-blue-500 rounded-xl'
                        onClick={() => navigate(`/exercise/${id}`)}
                    >
                        {button}
                    </button>
                </div>
                <FaLockOpen className='absolute top-4 right-4 text-xl' />
            </div>
            :
            <div className='usercourse-lesson realtive' key={index}>
                <FaLock className='absolute top-4 right-4 text-xl' />
                <div className='lesson-background'>
                    <p className='text-white text-9xl'>{index + 1}</p>
                </div>
                <div className='px-4 flex flex-col'>
                    <p className='text-xl'>{name}</p>
                    <p className='text-slate-400'>{description ? description : ""}</p>
                </div>
                <div className='px-4 pb-2'>
                    <button
                        className='py-2 px-4 text-white bg-blue-400 rounded-xl'
                        onClick={() => navigate(`/exercise/${id}`)}
                        disabled
                        onMouseOver={() => setShowButtonInfo(true)}
                        onMouseLeave={() => setShowButtonInfo(false)}
                    >
                        {button}
                        {showButtoninfo &&
                            <div className='absolute right-10 bottom-3 text-black w-42 border-1 rounded-xl shadow-5 p-1'>
                                <p>complete lesson {index} first</p>
                            </div>
                        }
                    </button>
                </div>
            </div >
        }
        </>
    )
}

export default Lesson