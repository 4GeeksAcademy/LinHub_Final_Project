import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../store/appContext'

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { store, actions } = useContext(Context)

    return (
        <>
            <nav className='flex justify-around items-center py-6 shadow-lg'>
                <div className='flex items-center'>
                    <img className='logo me-2' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/logo.svg' alt='logo de linhub' />
                    <h1 className='text-gray-500 text-xl font-bold'>LinHub</h1>
                </div>
                <div>
                    <button
                        onClick={() => setOpen(!open)}
                        className='relative font-bold text-gray-500'
                    >
                        {(store.currentIdiom == "Español" ? "Idioma de la pagina: " : "Page Language: ") + store.currentIdiom}
                        <span className='text-gray-500'> &#9660;</span>
                    </button>
                    {
                        open &&
                        <div className='absolute border-slate-500 top-16'>
                            <div className='flex justify-between w-52'>
                                <div className='cursor-pointer text-gray-500 font-bold' onClick={() => actions.changeLanguage("English")}>
                                    🇺🇸
                                    English
                                </div>
                                <div className='cursor-pointer text-gray-500 font-bold' onClick={() => actions.changeLanguage("Español")}>
                                    🇪🇸
                                    Español
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar