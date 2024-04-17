import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState } from "react";

export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState({ "email": "", "password": "" });

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = (e) => {
        e.preventDefault()
        actions.loginUser(userInfo)
    }

    return (
        <>
            <div className="flex items-center justify-center min-w-screen w-full h-full" style={{ minHeight: '88vh' }}>
                <div className="max-w-xs w-full">
                    <div className="login-wrapper w-full px-8 py-12 bg-purple-600 shadow rounded-box rounded-lg relative">

                        <div className="text-5xl text-purple-200 text-center mb-5">
                            {store.currentIdiom === "Español" ? "¡Bienvenido!" : "Welcome!"}
                        </div>
                        <form id="loginform">
                            <input
                                className="mt-2 block w-full h-10 px-2 py-1 border border-gray-300 rounded-md font-overpass text-base text-gray-700 focus:outline-none focus:border-purple-500"
                                type="text"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                            />
                            <input
                                className="mt-2 block w-full h-10 px-2 py-1 border border-gray-300 rounded-md font-overpass text-base text-gray-700 focus:outline-none focus:border-purple-500"
                                type="password"
                                placeholder={store.currentIdiom === "Español" ? "Contraseña" : "Password"}
                                name="password"
                                required
                                onChange={handleChange}
                            />
                            <button
                                className="mt-2 bg-purple-900 hover:bg-purple-700 text-purple-200 hover:text-purple-50 font-overpass text-base font-semibold py-2 px-4 rounded inline-flex items-center"
                                type="submit"
                                title="Ingresar"
                                name="Ingresar"
                                onClick={(e) => handleLogin(e)}
                            >
                                Login
                            </button>
                        </form>
                        <div className="pie-form mt-4">
                            {/* <Link className="mt-4 text-purple-900" to="">{store.currentIdiom === "Español" ? '¿Perdiste tu contraseña?' : 'Lost your Password?'}</Link><br /> */}
                            <Link className="mt-2 text-purple-900" to="/signup">{store.currentIdiom === "Español" ? '¿No tienes Cuenta? Registrate' : 'Need an account Register'}</Link>
                        </div>
                    </div>
                    <div className="inferior">
                        <Link to="/">{store.currentIdiom === "Español" ? "Volver" : "Go Back"}</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
