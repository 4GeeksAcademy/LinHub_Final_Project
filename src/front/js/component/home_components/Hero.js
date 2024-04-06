import React, { useContext } from 'react';
import { Context } from '../../store/appContext';


const Hero = () => {
    const { store } = useContext(Context);
    const { currentIdiom } = store;

    return (
        <div id='hero-body' className="flex justify-center items-center mt-8">
            <div>
                <img className='mr-8' src="https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_two.svg" alt="Girl in a jacket" margin-left="800px" width="500" height="600"/>
            </div>
            <div id='hero' className='d-flex flex-column'  >
                <h1 className='text-5xl'>
                    <strong>
                        {currentIdiom === 'Español' ? '! La forma más divertida y efectiva de aprender inglés!' : '! The most fun and effective way to learn English!'}
                    </strong>
                </h1>
                <button id='boton-hero' type="button" className="btn btn-primary text-center">
                    <strong>{currentIdiom === 'Español' ? '¡Empieza ahora!' : 'Start now!'}</strong>
                </button>
                <button id='boton-hero2' type="button" className="btn btn-primary text-center">
                    <strong>{currentIdiom === 'Español' ? '¡Ya tengo cuenta!' : 'I already have an account!'}</strong>
                </button>
            </div>
        </div>
    );
};

export default Hero;
