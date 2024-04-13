import React from 'react';



export const PageOne = () => {

    return (<>

        <div className="flex justify-between h-screen p-8">
            <div className="w-1/3 bg-gray-200 p-4">
                <h2 className="text-lg font-semibold">Lado Izquierdo</h2>
                <button id='boton-pageOne' type="button" className="block m-auto text-center m-0 p-0 h-14 rounded-xl border-0 w-96 mt-5">Perfil</button>
                <button id='boton-pageOne' type="button" className="block m-auto text-center m-0 p-0 h-14 rounded-xl border-0 w-96 mt-10">Chats</button>
                <button id='boton-pageOne' type="button" className="block m-auto text-center m-0 p-0 h-14 rounded-xl border-0 w-96 mt-10">Peticiones</button>

                <div className="border border-gray-300 p-4 rounded-md shadow-lg mt-20">
                    <h2 className="text-lg font-semibold mb-2"> <button id='boton-pageOne' type="button" className="block m-auto text-center m-0 p-0 h-14 rounded-xl border-0 w-96 mt-1">Agenda Clase Privada!</button>
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra enim nec tincidunt hendrerit.</p>
                </div>


            </div>






            <div className="w-2/3 bg-white-300 p-4">
                <h2 className="text-lg font-semibold">Lado Derecho</h2>

                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-full bg-purple-200 animate-progress-stripes" style={{ width: '65%' }}></div>
                </div>
                 
            </div>
        </div>


    </>)
}