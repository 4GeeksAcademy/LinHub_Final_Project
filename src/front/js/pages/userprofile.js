import React, { useContext, useEffect, useState, useRef } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import LoggedNavbar from '../component/usercourse_components/LoggedNav'

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [showAlert, setShowAlert] = useState(false);
    const [file, setfile] = useState(null)
    const [serverResponse, setServerResponse] = useState('');


    const handleFiles = (files) => {
        setfile(files[0])
    }

    const fileUpload = useRef(null);
    const uploadProfilePic = (e) => {
        console.log(e);
    };

    const handleUpload = () => {
        console.log(fileUpload.current.click(), "fileUpload");
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handleCancel = async () => {

        navigate("/usercourse")
    }

    const handleSubmit = async (file) => {
        if (!file) return

        const formData = new FormData();

        formData.append('image', file);

        try {
            const resp = await fetch(process.env.BACKEND_URL + '/api/image', {
                method: 'POST',
                body: formData,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": 'Bearer ' + store.userToken.token,

                }

            },

            )
            const data = await resp.json()
            setServerResponse(data.url)
        } catch (err) {
            setServerResponse(err.message)
        }
    }



    const handleSave = async () => {
        await actions.updateUser(store.userToken.token, user,)
        handleSubmit(file)
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }

    useEffect(() => {
        if (store.userToken) {
            console.log(store.userToken)
            const getCurrentUser = async (e) => {
                //   e.preventDefault()
                const user = await actions.currentUser(store.userToken.token)
                setUser(user)

            }
            getCurrentUser()
        }

        else {
            navigate('/')
        }
    }, [])


    return (<>

        <LoggedNavbar
            userImage={store.userToken.identity.image}
            username={store.userToken.identity.first_name + ' ' + store.userToken.identity.last_name}
            language={store.userToken.identity.language == 1 ? "English" : "Español"}
        />
       {showAlert && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-bold text-lg text-green-700 mb-2">
                {store.userToken.identity.native_language === 2 ? "Perfil modificado" : "Modified Profile"} 
            </p>
            <p className="text-sm text-gray-700">
                {store.userToken.identity.native_language === 2 ? "El perfil ha sido modificado exitosamente" : "Profile has been successfully modified" }
            </p>
        </div>
    </div>
)}


        <div className='mt-20 rounded-lg mx-auto max-w-screen-sm px-4 sm:px-4 sm:px-4 py-4 shadow-3'>
            <form>
                <div class="space-y-40 mt-3">
                    <div class="border-b border-gray-900/10 pb-20">
                        <h2 class="font-semibold leading-7 text-gray-900 text-2xl">
                            {store.userToken.identity.native_language === 2 ? "Perfil" : "Profile" } 

                        </h2>
                        <div class="mt-2 flex justify-center items-center gap-x-5 ">
                            <div class="h-48 w-48 text-gray-600 rounded-full overflow-hidden ">
                                {/* Mostrar la imagen si hay un archivo seleccionado */}
                                {file && <img src={URL.createObjectURL(file)} alt="image-preview" style={{ Width: '100%', Height: '100%', objectFit: 'cover' }} />}
                                {/* SVG para mostrar si no hay un archivo seleccionado */}
                                {!file && !user?.image && (
                                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                                    </svg>
                                )}
                                {!file && user?.image && <img src={user?.image} alt="image-preview" style={{ Width: '100%', Height: '100%', objectFit: 'cover' }} />}
                            </div>
                            <div className="mt-3 flex justify-center items-center flex-col gap-y-2">
                            {serverResponse}

                            
                            <button onClick={() => handleUpload()}
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                {store.userToken.identity.native_language === 2 ? "Cambiar" : "Change" } 
                            </button>
                            {/* Input para seleccionar un archivo */}
                            <input
                                type="file"
                                ref={fileUpload}
                                style={{ opacity: "0", width:"10px" }}
                                accept=".jpg, .png, .gif"
                                onChange={(event) => handleFiles(event.target.files)}
                            />
                         </div>

                        </div>
                        <div class="mt-1">
                            <div class="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    {store.userToken.identity.native_language === 2 ? "Nombre de Usuario" : "User name" } 
                                </label>
                                <div className="">
                                    <input
                                        defaultValue={user?.username}
                                        onChange={handleChange}
                                        type="text"
                                        name="username"
                                        id="username"
                                        autoComplete="family-name"
                                        className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div class="mt-1">
                                <div class="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        {store.userToken.identity.native_language === 2 ? "Nombre" : "First Name" } 
                                    </label>
                                    <div className="">
                                        <input
                                            type="text"
                                            name="first_name"
                                            id="first_name"
                                            defaultValue={user?.first_name}
                                            onChange={handleChange}
                                            autoComplete="family-name"
                                            className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>



                                </div>
                                <div class="sm:col-span-3">

                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        {store.userToken.identity.native_language === 2 ? "Correo" : "Email" } 
                                    </label>
                                    <div className="">
                                        <input disabled
                                            placeholder={user?.email}
                                            className="shadow-md block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button onClick={handleCancel} type="button" class="text-sm font-semibold leading-6 text-gray-900">
                                        {store.userToken.identity.native_language === 2 ? "Cancelar" : "Cancel" } 

                                    </button>
                                    <button onClick={handleSave} type="button" class="rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

                                        {store.userToken.identity.native_language === 2 ? "Guardar" : "Save" }


                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>)
}