import React from 'react'
import { useState } from 'react';
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";


const LivesAndStreak = ({ type, info, description }) => {

    const [fireInfo, setFireInfo] = useState(false)
    const [heartInfo, setHeartInfo] = useState(false)

    return (
        <>
            <div className='flex items-center'>
                {type && type == "fire" ?
                    <FaFireFlameCurved className='text-red-500 text-2xl' onMouseEnter={() => setFireInfo(true)} onMouseLeave={() => setFireInfo(false)} />
                    :
                    <FaHeartbeat className='text-red-500 text-2xl' onMouseEnter={() => setHeartInfo(true)} onMouseLeave={() => setHeartInfo(false)} />
                }



                <p className="text-xs ps-1">{info}</p>


                {type == "fire" && fireInfo &&
                    <div className='px-2 absolute top-14 w-100 border-1 rounded-xl shadow-5 py-4 left-0 bg-white'>
                        {description}
                    </div>
                }
                {type == "heart" && heartInfo &&
                    <div className='px-2 absolute top-14 w-100 border-1 rounded-xl shadow-5 py-4 left-0 bg-white'>
                        {description}
                    </div>
                }
            </div>
        </>
    )
}

export default LivesAndStreak