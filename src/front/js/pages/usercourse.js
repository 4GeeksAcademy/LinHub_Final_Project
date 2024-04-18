import React from 'react';
import { useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { faFire, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarButton = ({ text, handleClick }) => {
    return (
        <button
            id='boton-pageOne'
            type="button"
            className="block m-auto mt-5 text-center m-0 p-3 h-14 rounded-xl border-0 w-full md:w-96 mt-10"
            onClick={handleClick}
        >
            {text}
        </button>
    );
};

const LessonItem = ({ title, isCompleted }) => {
    return (
        <div className='flex items-center justify-between bg-gray-100 mt-3 rounded-xl p-4 text-3xl'>
            <span className='ms-5'><strong>{title}</strong></span>
            <button id='boton-pageOne1' className={`rounded-full py-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-4`} ></button>
        </div>
    );
};

export const UserCourse = () => {

    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        if (store.userToken) {
            // actions.getModuleInfo()
            console.log('logged')
        }
        else {
            navigate('/')
        }
    }, [])

    return (
        <div className="flex justify-between p-8" style={{ minHeight: '89vh' }}>
            <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-xl">
                {/* <h2 className="text-lg font-semibold">Lado Izquierdo</h2> */}
                <SidebarButton text="Perfil" />
                <SidebarButton text="Chats" />
                <SidebarButton text="Peticiones" />
                <div className="border border-gray-300 p-4 rounded-2xl shadow-lg mt-12">
                    <h2 className="text-lg font-semibold mb-2">
                        <SidebarButton text="Agenda Clase Privada!" />
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra enim nec tincidunt hendrerit.</p>
                </div>
                <SidebarButton text="Log out" handleClick={() => actions.logOut()} />
            </div>
            <div className="hidden md:block w-2/3 bg-white-300 p-4">



                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden flex p-3">
                    <div className="absolute left-0 top-0 h-full bg-violet-500 animate-progress-stripes" style={{ width: '65%' }}></div>
                </div>



                <div className='flex flex-row justify-around mt-3'>
                    <p> 5 <FontAwesomeIcon icon={faHeart} size="2xl" style={{ color: "#ff3d3d", }} /></p>
                    <p> 4 <FontAwesomeIcon icon={faFire} size="2xl" secondaryColor="red" style={{ color: "#ff9a57", secondaryColor: "red" }} />  </p>
                    <img src='https://static.wikia.nocookie.net/duolingo/images/7/79/Ingles.png/revision/latest?cb=20230710181050&path-prefix=es' style={{ width: '40px' }} />

                </div>

                <LessonItem title="Leccion de comida ! 🍙🍿🥨" isCompleted={true} />
                <LessonItem title="Leccion viajes ! 🧳👜🛫" isCompleted={true} />
                <LessonItem title="Leccion animales ! 🐼🐱🦝" isCompleted={true} />
            </div>
        </div>
    );
};
