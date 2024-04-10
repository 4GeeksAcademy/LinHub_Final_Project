import React, { useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';



const Hero = () => {
    const { store } = useContext(Context);
    const { currentIdiom } = store;

    return (
        <>
            <div id='hero-body' className="flex justify-center items-center mt-36 mb-44">
                <div>
                    <img className='mr-8' src="https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_two.svg" alt="LinHub Penguin (Logo)" margin-left="800px" width="600" height="600" />
                </div>
                <div id='hero' className='d-flex flex-column'  >
                    <h1 className='text-5xl text-gray-500 font-bold text-center'>
                        {currentIdiom === 'Español' ? '!La forma más divertida y efectiva de aprender inglés!' : '! The most fun and effective way to learn English!'}
                    </h1>
                    <div className='flex flex-column justify-center items-center mt-16'>
                        <button id='boton-hero' type="button" className="text-white text-center m-0 p-0 h-14 rounded-xl border-0">
                            <Link to='/signup'>
                                <strong className='py-2'>{currentIdiom === 'Español' ? '¡Empieza ahora!' : 'Start now!'}</strong>
                            </Link>
                        </button>
                        <button id='boton-hero2' type="button" className="text-purple-500 text-center mt-2 p-0 h-14 rounded-xl border-b-0 border-2 border-slate-200">
                            <Link to='/login'>
                                <strong className='py-2'>{currentIdiom === 'Español' ? '¡Ya tengo cuenta!' : 'I already have an account!'}</strong>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className='border-y-4 flex justify-center items-center py-4 gap-6 shadow'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7ISNR7kNLV8sJHhxDWaRBKir0vkiUgrpmw&s' className='flag h-10 w-10 bg-orange-300 rounded-full top-1 start-1' />
                    <p className="font-bold text-xl">English</p>
                </div>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg' className='flag h-10 w-10 bg-orange-300 rounded-full top-1 start-1' />
                    <p className="font-bold text-xl">Español</p>
                </div>
            </div >
        </>
    );
};

export default Hero;
