import React, { useContext, useEffect } from 'react';
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

                <div className='relative'>
                    <div className='absolute left-1/2 top-16 -translate-x-1/2 h-4 w-[80%] rounded-xl bg-gray-300' >
                        <div id='progress' className='h-full bg-purple-500 rounded-[inherit]' style={{ width: '0' }}></div>
                    </div>

                    <svg width="230" height="420" viewBox="0 0 178 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2.5" y="2.5" width="173" height="275" rx="23.5" fill="white" stroke="#FF9600" stroke-width="5" />
                        <rect x="26" y="227" width="125" height="27" rx="10" fill="#A75DE1" />
                        <rect x="26" y="72" width="60" height="50" rx="5" fill="#F1F1F1" />
                        <path d="M65.4171 107.494C61.8758 110.835 52.1242 110.835 48.5829 107.494C46.3189 105.357 47.1483 101 47.1483 101H66.8517C66.8517 101 67.6812 105.357 65.4171 107.494Z" fill="#F2B65C" />
                        <path d="M65.4171 87.5064C61.8758 84.1645 52.1242 84.1645 48.5829 87.5064C46.3189 89.6429 47.1483 94 47.1483 94H66.8517C66.8517 94 67.6812 89.6429 65.4171 87.5064Z" fill="#F2B65C" />
                        <path d="M45 96C45 95.4477 45.4477 95 46 95H68C68.5523 95 69 95.4477 69 96C69 96.5523 68.5523 97 68 97H46C45.4477 97 45 96.5523 45 96Z" fill="#E93D3D" />
                        <rect x="45" y="98" width="24" height="2" rx="1" fill="#45D95C" />
                        <rect x="20" y="146" width="60" height="50" rx="5" fill="#F1F1F1" />
                        <rect x="44" y="160" width="11" height="25" rx="3" fill="#D5D5D5" />
                        <path d="M44 172H55V182C55 183.657 53.6569 185 52 185H47C45.3431 185 44 183.657 44 182V172Z" fill="#2AD3F8" />
                        <rect x="48" y="157" width="3" height="4" fill="#D4D4D4" />
                        <rect x="96" y="72" width="60" height="50" rx="5" fill="#F1F1F1" />
                        <path d="M126.097 84.8994C126.459 84.1386 127.541 84.1386 127.903 84.8994L138.445 107.071C138.76 107.734 138.276 108.5 137.542 108.5H116.458C115.724 108.5 115.24 107.734 115.555 107.071L126.097 84.8994Z" fill="#F2EA27" />
                        <path d="M114 108.352C114 107.605 114.605 107 115.352 107H138.921C139.667 107 140.273 107.605 140.273 108.352C140.273 109.098 139.667 109.703 138.921 109.703H115.352C114.605 109.703 114 109.098 114 108.352Z" fill="#F49000" />
                        <circle cx="122.5" cy="102.5" r="1.5" fill="#EA2E2E" />
                        <circle cx="128.5" cy="94.5" r="1.5" fill="#EA2E2E" />
                        <circle cx="131.5" cy="103.5" r="1.5" fill="#EA2E2E" />
                        <rect x="96" y="146" width="60" height="50" rx="5" fill="#F1F1F1" />
                        <path d="M109.533 176.976L116.63 157.426L142.455 162.634L109.533 176.976Z" fill="#FFC200" />
                        <path d="M109.5 177L142.5 162.5L142 175.5L109.5 187V177Z" fill="#FFC200" />
                        <ellipse cx="109.5" cy="182" rx="1.5" ry="2" fill="#F1F1F1" />
                        <ellipse cx="117.797" cy="164.861" rx="1.66667" ry="2.5" transform="rotate(51.4459 117.797 164.861)" fill="#E1AB00" />
                        <ellipse cx="127.797" cy="164.861" rx="2.29076" ry="4.39107" transform="rotate(66.0868 127.797 164.861)" fill="#E1AB00" />
                        <ellipse cx="137.672" cy="171.4" rx="1.59975" ry="2.26489" transform="rotate(0.185 137.672 171.4)" fill="#E1AB00" />
                        <ellipse cx="123.077" cy="177.603" rx="1.59975" ry="2.26489" transform="rotate(0.185 123.077 177.603)" fill="#E1AB00" />
                        <ellipse cx="112.774" cy="173.195" rx="0.543042" ry="1.23572" transform="rotate(51.4459 112.774 173.195)" fill="#E1AB00" />
                    </svg>

                </div>





            </div>
        </>
    )
}

export default SectionShowOne;
