import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import Navbar from "../component/home_components/Navbar";

export const SignUp = () => {
  const { store, actions } = useContext(Context);

  const [availableLanguages, setAvailableLanguages] = useState([])
  const [availableCourses, setAvailableCourses] = useState([])

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    native_language: 1,
    learning_language: 2
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    if (name === "learning_language" || name === "native_language") setUserInfo({ ...userInfo, [name]: Number(value) })
    else setUserInfo({ ...userInfo, [name]: value })

  }
  console.log(userInfo)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo)
    console.log(userInfo.username)
    
   
    if (userInfo.native_language === userInfo.learning_language) {
      alert(store.currentIdiom !== "Español" ?
        "The native language and the learning language must be different" :
        "El idioma nativo y el idioma de aprendizaje deben ser diferentes");
      return; 
    }
    var registered = null
    try{registered = await actions.createNewUser(userInfo) } 
    catch (error) {
     
      console.log(error.message)
    	if (error.message == "Email already exists"){
       
        alert(store.currentIdiom !== "Español" ?
        "Email already exists" :
        "Correo electronico ya existe");
        return;
      }
      if (error.message == "Username already exists"){
       
        alert(store.currentIdiom !== "Español" ?
        "Username already exists" :
        "Nombre de usuario ya existe");
        return;
      }
    return false; 
  }

    if (registered) navigate('/login')
    else undefined
  };

  useEffect(() => {
    const getAvailableLanguages = async () => {
      try {
        const res = await fetch(process.env.BACKEND_URL + '/api/languages');
        const data = await res.json();
        setAvailableLanguages(data)
        if (!res.ok) throw new Error
        return true
      } catch (error) {
        console.log(error);
        return false
      }
    }
    getAvailableLanguages()
  }, [])

  useEffect(() => {
    const getAvailableCourses = async () => {
      try {
        const res = await fetch(process.env.BACKEND_URL + '/api/availableCourses');
        const data = await res.json();
        setAvailableCourses(data)
        if (!res.ok) throw new Error
        return true
      } catch (error) {
        console.log(error);
        return false
      }
    }
    getAvailableCourses()
  }, [])

  console.log(availableCourses)
  console.log(availableLanguages)
  return (<>
    <Navbar />
    <div className='flex flex-col justify-around items-center mx-auto max-w-screen-sm h-screen'>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 mx-auto max-w-screen-sm h-screen">
        <div className=" flex flex-row justify-center my-2 ">
          <div id="text-form-title" className="text-3xl text-violet-500 ">
            <div className="flex flex-col justify-around items-center mt-12">
              {store.currentIdiom !== "Español" ? (
                <>
                  <h1>Ready to learn your dream language?</h1>
                  <p>Let's Start!</p>
                </>
              ) : (
                <>
                  <h1>Listo para aprender tu idioma de ensueño?</h1>
                  <p>¡Empecemos!</p>
                </>
              )}
            </div>
          </div>
          <img id="pingui-form" className="" src="https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_two.svg" alt="LinHub Penguin (Logo)" margin-left="800px" width="150px" />

        </div>
        <div id="form1" className="border border-gray-900/10 pb-15 p-4 mx-auto max-w-screen-sm rounded-lg shadow-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {store.currentIdiom !== "Español" ? (
              <>Personal Information</>
            ) : (
              <>Información Personal</>
            )}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {store.currentIdiom !== "Español" ? (
              <>Use a permanent address where you can receive mail.</>
            ) : (
              <>Utilice una dirección permanente donde pueda recibir correo.</>
            )}
          </p>

          <div className="mt-2">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                {store.currentIdiom !== "Español" ? (
                  <>First name</>
                ) : (
                  <>Nombre</>
                )}
              </label>
              <div className="">
                <input
                  type="text"
                  name="first_name"
                  id="first-name"
                  autoComplete="given-name"
                  required
                  onChange={handleChange}
                  value={userInfo.first_name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                {store.currentIdiom !== "Español" ? (
                  <>Last name</>
                ) : (
                  <>Apellido</>
                )}
              </label>
              <div className="sm:col-span-3">
                <input
                  type="text"
                  name="last_name"
                  id="last-name"
                  autoComplete="family-name"
                  required
                  onChange={handleChange}
                  value={userInfo.last_name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-2">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                User name
              </label>
              <div className="sm:col-span-3">
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="family-name"
                  required
                  onChange={handleChange}
                  value={userInfo.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 mt-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                {store.currentIdiom !== "Español" ? (
                  <>Email address</>
                ) : (
                  <>Dirección de correo electrónico</>
                )}
              </label>
              <div className="sm:col-span-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  value={userInfo.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  {store.currentIdiom !== "Español" ? (
                    <>Password</>
                  ) : (
                    <>Contraseña</>
                  )}
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                  value={userInfo.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-between gap-6 w-full h-full" >
              <div className="grow">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 w-100 ">
                  {store.currentIdiom !== "Español" ? (
                    <>First Language</>
                  ) : (
                    <>Idioma Nativo</>
                  )}
                </label>
                <div className="mt-2">
                  <select
                    id="first_language"
                    name="native_language"
                    autoComplete="Firts Lenguague"
                    onChange={handleChange}
                    value={userInfo.native_language}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 w-full"
                  >
                    {availableLanguages.map(language => {
                      return (
                        <option key={language.id} value={language.id}>{language.language_name}</option>
                      )
                    })
                    }
                  </select>
                </div>
              </div>
              <div className="grow">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  {store.currentIdiom !== "Español" ? (
                    <>What do You Want to learn?</>
                  ) : (
                    <>¿Qué Idioma Quieres Aprender?</>
                  )}
                </label>
                <div className="mt-2">
                  <select
                    id="target_language"
                    name="learning_language"
                    autoComplete="First Lenguague"
                    onChange={handleChange}
                    value={userInfo.learning_language}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {availableCourses.map(course => {
                      return (
                        <option key={course.id} value={course.language_id}>{course.name}</option>
                      )
                    })
                    }
                  </select>
                </div>

              </div>

            </div>
            <div className="footer" style={{ display: 'flex', justifyContent: 'center' }}>

              <button className="flex justify-center mt-7 mb-1 bg-purple-900 hover:bg-purple-700 text-purple-200 hover:text-purple-50 font-overpass text-base font-semibold py-3 px-10 rounded "
                type="submit"
                title="Ingresar"
                name="Ingresar">
                {store.currentIdiom !== "Español" ? (
                  <>Register</>
                ) : (
                  <>Registrar</>
                )}
              </button>

            </div>
          </div >
        </div >
      </form >
    </div >
  </>
  );
}
