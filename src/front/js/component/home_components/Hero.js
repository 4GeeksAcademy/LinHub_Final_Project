import React, { useContext } from 'react';
import { Context } from '../../store/appContext';


const Hero = () => {
    const { store } = useContext(Context);
    const { currentIdiom } = store;

    return (
        <div id='hero-body' className="flex justify-center items-center mt-28">
            <div>
                <img className='mr-8' src="https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_two.svg" alt="Girl in a jacket" margin-left="800px" width="500" height="600" />
            </div>
            <div id='hero' className='d-flex flex-column'  >
                <h1 className='text-5xl text-gray-500 font-bold text-center'>
                    {currentIdiom === 'Español' ? '!La forma más divertida y efectiva de aprender inglés!' : '! The most fun and effective way to learn English!'}
                </h1>
                <div className='flex flex-column justify-center items-center mt-16'>
                    <button id='boton-hero' type="button" className="text-white text-center m-0 p-0 h-14 rounded-xl border-0">
                        <strong className='py-2'>{currentIdiom === 'Español' ? '¡Empieza ahora!' : 'Start now!'}</strong>
                    </button>
                    <button id='boton-hero2' type="button" className="text-purple-500 text-center mt-2 p-0 h-14 rounded-xl border-b-0 border-2 border-slate-200">
                        <strong className='py-2'>{currentIdiom === 'Español' ? '¡Ya tengo cuenta!' : 'I already have an account!'}</strong>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
