import React, { useContext, } from 'react';
import { Context } from '../../store/appContext';

const SectionShowOne = () => {
    const { store, actions } = useContext(Context);
    return (
        <>
            <div className='flex flex-row justify-center items-center py-4 mt-20'>
                {store.currentIdiom === 'Español' ? (
                    <div className='flex-initial w-1/2 align-middle'>
                        <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Divertido, Interactivo y gratis</h1>
                        <p className='font-bold text-gray-500 text-xl'>Sumérgete en nuestras lecciones cortas diseñadas para proporcionarte una experiencia interactiva única. ¡Aquí, no solo aprenderás, sino que también fortalecerás tus habilidades lingüísticas junto a personas reales!</p>
                    </div>
                ) : (
                    <div className='flex-initial w-1/2 align-middle'>
                        <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Fun, Interactive, and Free</h1>
                        <p className='font-bold text-gray-500 text-xl'>Immerse yourself in our short lessons designed to provide you with a unique interactive experience. Here, you will not only learn, but also strengthen your language skills alongside real people!</p>
                    </div>
                )}
                <img className='flex-initial' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/sectionh_three.svg' width="250px" />
            </div>
        </>
    )
}

export default SectionShowOne;
