import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    native_language: "Español",
    learning_language: "English"
  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
    console.log(userInfo)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createNewUser(userInfo)
    navigate('/login')
  };

  console.log(userInfo)

  return (

    <div className='flex flex-col justify-around items-center'>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-row justify-center my-4">
          <div id="text-form-title" className="text-3xl text-violet-500 ">
            <div className="mt-12">
              <h1>Ready to learn your dream lenguague?</h1>
              <p>Lets Start!</p>
            </div>
          </div>
          <img id="pingui-form" className="" src="https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/section_two.svg" alt="LinHub Penguin (Logo)" margin-left="800px" width="150px" />

        </div>
        <div id="form1" className="border border-gray-900/10 pb-15 p-5 rounded-lg shadow-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="">
            <div className="">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="first_name"
                  id="first-name"
                  autoComplete="given-name"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last_name"
                  id="last-name"
                  autoComplete="family-name"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-between gap-6 w-full h-full" >
              <div className="grow">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900 w-100 ">
                  Firts Lenguague
                </label>
                <div className="mt-2">
                  <select
                    id="first_language"
                    name="native_language"
                    autoComplete="Firts Lenguague"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 w-full"
                  >
                    <option>Español</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
              <div className="grow">
                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  What do You Want to learn?
                </label>
                <div className="mt-2">
                  <select
                    id="target_language"
                    name="learning_language"
                    autoComplete="First Lenguague"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option>English</option>
                    <option>Español</option>
                  </select>

                </div>

              </div>

            </div>
            <div className="footer" style={{ display: 'flex', justifyContent: 'center' }}>

              <button className="flex justify-center mt-7 mb-1 bg-purple-900 hover:bg-purple-700 text-purple-200 hover:text-purple-50 font-overpass text-base font-semibold py-3 px-10 rounded "
                type="submit"
                title="Ingresar"
                name="Ingresar">Register</button>

            </div>
          </div >
        </div >
      </form >
    </div >
  )
}