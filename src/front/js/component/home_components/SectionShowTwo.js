import React from 'react'

const SectionShowTwo = () => {
    const { store, actions } = useContext(Context);
    return (
        
        <>
        
          <div className='container flex flex-row justify-around items-center py-4'>
            <img className='flex-initial w-30' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_four.svg' />
            {store.currentIdiom === 'Español' ? (
                <div className='flex-initial w-50 align-middle'>
                    <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Mantente Motivado</h1>
                    <p className='font-bold text-lg text-gray-500 text-xl'>Obten puntos al completar niveles que luego podras utilizar para obtener premios o jugartelos en un duelo a muerte contra tus contactos!</p>
                </div>
            ) : (
                <div className='flex-initial w-50 align-middle'>
                    <h1 className='text-violet-500 text-6xl mb-8 font-bold'>Stay Motivated</h1>
                    <p className='font-bold text-lg text-gray-500 text-xl'>hola</p>
                </div>
            )}
        </div>
    </>










        
    )
}

export default SectionShowTwo


