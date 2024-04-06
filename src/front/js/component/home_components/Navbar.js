import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../../store/appContext'
import logo from '../../../img/logo.svg'

const Navbar = () => {
    const [open, setOpen] = useState(true)
    const { store, actions } = useContext(Context)

    return (
        <>
            <nav className='flex justify-around items-center py-2'>
                <div className='flex items-center'>
                    <img className='logo me-2' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/logo.svg' alt='logo de linhub' />
                    <h1 className='text-gray-500 text-xl font-bold'>LinHub</h1>
                </div>
                <div>
                    <button className='relative font-bold text-gray-500'>Idioma de la pagina: {store.currentIdiom} <span className='text-gray-500'>&#9660;</span></button>
                    {
                        open &&
                        <div className='absolute border-slate-500'>
                            <div className='flex justify-around w-60'>
                                <div className='text-gray-500 font-bold'>
                                    <img src='../../../img/BanderaUsa' />
                                    English
                                </div>
                                <div className='text-gray-500 font-bold'>Español</div>
                            </div>
                        </div>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar