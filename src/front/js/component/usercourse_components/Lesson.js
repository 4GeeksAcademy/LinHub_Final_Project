import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lesson = ({ index, name, description, id, button }) => {
    const navigate  = useNavigate()

    return (
        <>
            <div className='usercourse-lesson' key={index}>
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
            </div>
        </>
    )
}

export default Lesson