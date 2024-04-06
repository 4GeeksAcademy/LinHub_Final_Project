import React from 'react';

const SectionShowOne = () => {
    return (
        <>
            <div className='container flex flex-row justify-around items-center py-4'>
                <div className='flex-initial w-50 align-middle'>
                    <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Divertido, Interactivo y gratis</h1>
                    <p className='font-bold text-lg text-gray-500 text-xl'>Sumérgete en nuestras lecciones cortas diseñadas para proporcionarte una experiencia interactiva única. ¡Aquí, no solo aprenderás, sino que también fortalecerás tus habilidades lingüísticas junto a personas reales!</p>
                </div>
                <img className='flex-initial w-30' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/4a4d31b927d00effb9e2295c47a705a244ca8bc5/src/front/img/section_three.svg' />
            </div>
        </>
    )
}

export default SectionShowOne;
