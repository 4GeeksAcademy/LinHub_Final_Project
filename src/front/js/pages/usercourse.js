import React from 'react';

const SidebarButton = ({ text }) => {
    return (
        <button id='boton-pageOne' type="button" className="block m-auto text-center m-0 p-0 h-14 rounded-xl border-0 w-full md:w-96 mt-10">
            {text}
        </button>
    );
};

const LessonItem = ({ title, isCompleted }) => {
    return (
        <div className='flex items-center justify-between bg-gray-200 mt-5 rounded-full p-5 text-3xl'>
            <span className='ms-5'><strong>{title}</strong></span>
            <button id='boton-pageOne1' className={`rounded-full py-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-4`}></button>
        </div>
    );
};

export const UserCourse = () => {
    return (
        <div className="flex justify-between h-screen p-8">
            <div className="w-full md:w-1/3 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold">Lado Izquierdo</h2>
                <SidebarButton text="Perfil" />
                <SidebarButton text="Chats" />
                <SidebarButton text="Peticiones" />
                <div className="border border-gray-300 p-4 rounded-md shadow-lg mt-20">
                    <h2 className="text-lg font-semibold mb-2">
                        <SidebarButton text="Agenda Clase Privada!" />
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra enim nec tincidunt hendrerit.</p>
                </div>
            </div>
            <div className="hidden md:block w-2/3 bg-white-300 p-4">

                <h2 className="text-lg font-semibold">Lado Derecho</h2>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden flex">
                    <div className="absolute left-0 top-0 h-full bg-purple-200 animate-progress-stripes" style={{ width: '65%' }}></div>
                </div>

                <LessonItem title="Leccion de comida" isCompleted={true} />
                <LessonItem title="Leccion viajes" isCompleted={true} />
                <LessonItem title="Leccion animales" isCompleted={true} />
                <LessonItem title="Leccion saludos" isCompleted={false} />
                <LessonItem title="Leccion formal" isCompleted={false} />
            </div>
        </div>
    );
};
