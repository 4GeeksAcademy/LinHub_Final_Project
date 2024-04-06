
import { Context } from '../../store/appContext';
import React, { useContext, } from 'react';


const SectionShowTwo = () => {
    const { store, actions } = useContext(Context);
    return (
        
        <>
        
          <div className='container flex flex-row justify-around items-center py-4'>
            <img className='flex-initial w-30' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_four.svg' />
            {store.currentIdiom === 'Español' ? (
                <div className='flex-initial w-50 align-middle'>
                    <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Mantente Motivado</h1>
                    <p className='font-bold text-lg text-gray-500 text-xl'>Obtén puntos al completar niveles que luego podrás utilizar para obtener premios o jugartelos en un duelo a muerte contra tus contactos!</p>
                </div>
            ) : (
                <div className='flex-initial w-50 align-middle'>
                    <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Stay Motivated</h1>
                    <p className='font-bold text-lg text-gray-500 text-xl'>Earn points by completing levels that you can then use to obtain prizes or gamble them in a duel to the death against your contacts!</p>
                </div>
            )}
        </div>
    </>










        
    )
}

export default SectionShowTwo


