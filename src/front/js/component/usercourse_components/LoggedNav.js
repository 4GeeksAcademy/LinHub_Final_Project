import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../../store/appContext'
import { Link } from 'react-router-dom'
import { PiUserCircleFill } from "react-icons/pi";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = ({ userImage, language, username }) => {
    const [open, setOpen] = useState(false)
    const { store, actions } = useContext(Context)

    return (
        <>
            <nav className='flex justify-around items-center py-6 shadow-4'>
                <Link to={store.userToken ? `/usercourse` : "/"} className='flex items-center'>
                    <img className='logo me-2' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/logo.svg' alt='logo de linhub' />
                    <h1 className='text-gray-500 text-xl font-bold'>LinHub</h1>
                </Link>
                <div className='relative'>
                    <button
                        onClick={() => setOpen(!open)}
                        className='relative flex items-center content-center font-bold'
                    >
                        {userImage ? <img className="rounded-full w-12 h-12 object-cover" src={userImage} /> : <PiUserCircleFill className='text-5xl' />}
                        <span className=''> &#9660;</span>
                    </button>
                    {open &&
                        <div className='user-info-drop shadow-3 border-black absolute top-14 right-2 w-96 bg-white min-h-16 rounded z-50' style={{ border: '1px solid #e2e8f0' }}>
                            <p className='px-4 py-2 text-slate-700 text-xs'> {language ? "Learning Language: " + language : "Welcome"}</p>

                            <hr style={{ height: '3px', background: '#e2e8f0' }}></hr>

                            <div className='flex py-2' style={{ padding: '1rem' }}>
                                {userImage ? <img className='rounded-full w-16 h-16 object-cover' src={userImage}></img> : <PiUserCircleFill className='text-7xl' />}
                                <p className='text-2xl p-2'>{username ? username : "username"}</p>
                            </div>

                            <hr className='mx-4' style={{ height: '3px', background: '#e2e8f0' }}></hr>

                            <Link to="/userprofile">
                                <p className='cursor-pointer px-4 py-2 text-slate-700 text-md'>{language == "English" ? "Mi Perfil" : "My Profile"}</p>
                            </Link>

                            <hr className='mx-4' style={{ height: '3px', background: '#e2e8f0' }}></hr>

                            <div onClick={() => actions.logOut()} className='flex px-4 py-2 items-center cursor-pointer'>
                                <MdOutlineLogout className='text-3xl text-purple-500' />
                                <p className='ps-2 text-purple-500'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
            </nav >
        </>
    )
}

export default Navbar