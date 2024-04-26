
import { Context } from '../../store/appContext';
import React, { useContext, } from 'react';


const SectionShowTwo = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            <div className='flex flex-row justify-center items-center py-4'>
                <div className='relative'>
                    <div className='absolute left-1/2 top-16 -translate-x-1/2 h-4 w-[80%] rounded-xl bg-gray-300' >
                        <div id='progress' className='h-full bg-purple-500 rounded-[inherit]' style={{ width: '0' }}></div>
                    </div>
                    <svg width="230" height="420" viewBox="0 0 178 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2.5" y="2.5" width="173" height="275" rx="23.5" fill="white" stroke="#D52AF1" strokeWidth="5" />
                        <path d="M132.5 141.371C132.5 192.371 48.5002 184.931 45.0002 149.371C45.0002 149.371 43.9854 143.026 44.0002 138.931C44.0144 134.983 45.0002 128.871 45.0002 128.871C45.6178 123.065 63.0002 91.1966 67.0002 89.4305C71.6797 88.6851 74.0002 91.9305 80.0002 98.4305C83.5002 102.931 84.5002 99.4305 84.5002 99.4305C84.5002 99.4305 99.5002 72.5532 105.5 76.3714C127.5 90.3714 134.334 136.538 132.5 141.371Z" fill="#FF9600" stroke="#FF9600" />
                        <path d="M103.108 143.931C103.108 150.558 96.6158 155.931 88.6077 155.931C80.5995 155.931 74.1077 150.558 74.1077 143.931C74.1077 137.303 80.5995 117.431 88.6077 117.431C96.6158 117.431 103.108 137.303 103.108 143.931Z" fill="#F2EA27" />
                        <rect x="30" y="229" width="125" height="27" rx="10" fill="#A75DE1" />
                    </svg>

                </div>
                {store.currentIdiom === 'Español' ? (
                    <div className='ms-4 flex-initial w-1/2 align-middle'>
                        <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Mantente Motivado</h1>
                        <p className='font-bold text-lg text-gray-500 text-xl'>Obtén puntos al completar niveles que luego podrás utilizar para obtener premios o jugartelos en un duelo a muerte contra tus contactos!</p>
                    </div>
                ) : (
                    <div className='ms-4 flex-initial w-1/2 align-middle'>
                        <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Stay Motivated</h1>
                        <p className='font-bold text-lg text-gray-500 text-xl'>Earn points by completing levels that you can then use to obtain prizes or gamble them in a duel to the death against your contacts!</p>
                    </div>
                )}
            </div>
        </>











    )
}

export default SectionShowTwo


