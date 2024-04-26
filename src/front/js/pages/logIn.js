import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState } from "react";

export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState({ "email": "", "password": "" });
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const logged = await actions.loginUser(userInfo)
        if (logged) navigate(`/usercourse`)
        else setError(true)
    }

    return (
        <>  
            <div className="flex flex-column justify-center mt-3 items-center">

                
                    <svg className='body' width="130" height="130" viewBox="0 0 268 233" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path id="wing" d="M259.17 61.6942C258.446 86.2292 209.058 103.408 184.455 108.931L176.201 69.729C175.513 66.4621 247.26 40.0931 247.26 40.0931C251.76 38.1596 259.893 37.1592 259.17 61.6942Z" fill="#B02DDE" stroke="#B02DDE" />
                        <path id="wing" d="M3.31868 88.4504C8.13784 112.59 59.8098 122.558 85.0435 124.525L86.6413 84.6198C86.7745 81.2943 11.473 65.4177 11.473 65.4177C6.70254 64.1457 -1.50047 64.3109 3.31868 88.4504Z" fill="#B02DDE" stroke="#B02DDE" />
                        <path d="M80.0927 144.647C85.2284 197.734 101.774 201.218 141.524 201.218C184.887 197.89 204.477 187.751 199.342 134.664C194.206 81.5769 188.501 1.55539 127.069 4.88375C69.3518 8.0109 74.9569 91.5597 80.0927 144.647Z" fill="#B02DDE" />
                        <path d="M127.27 149.24C118.813 150.633 114.207 142.109 114.207 142.109L136.292 137.991C136.292 137.991 135.865 147.825 127.27 149.24Z" fill="#C34FEC" />
                        <path d="M155.776 142.585C147.319 143.977 142.713 135.454 142.713 135.454L164.798 131.336C164.798 131.336 164.371 141.17 155.776 142.585Z" fill="#C34FEC" />
                        <path d="M148.549 162.551C140.092 163.943 135.486 155.42 135.486 155.42L157.571 151.302C157.571 151.302 157.144 161.136 148.549 162.551Z" fill="#C34FEC" />
                        <path d="M159.592 21.5215C150.595 21.5216 140.254 28.1765 130.683 28.1768C121.112 28.1772 120.417 25.6432 101.774 25.7482C83.1315 25.8532 89.6235 80.6442 112.615 81.4202C119.975 81.6687 126.927 67.0022 134.297 66.8757C141.598 66.7504 148.699 77.3929 155.978 76.8601C178.943 75.1792 172.978 21.5215 159.592 21.5215Z" fill="#D9D9D9" />
                        <path className="eye" d="M136.768 59.6306C137.76 69.8836 141.267 70.5311 149.707 70.4685C158.92 69.757 163.098 67.7663 162.107 57.5133C161.115 47.2602 160.052 31.8019 147.002 32.542C134.741 33.2373 135.776 49.3775 136.768 59.6306Z" fill="white" />
                        <path className="eye" d="M102.728 62.5559C103.72 72.809 107.227 73.4564 115.667 73.3938C124.88 72.6824 129.059 70.6917 128.067 60.4386C127.075 50.1856 126.012 34.7273 112.962 35.4673C100.702 36.1626 101.737 52.3029 102.728 62.5559Z" fill="white" />
                        <path d="M117.321 79.3333C117.282 78.7824 117.697 78.3056 118.248 78.2683L148.19 76.2428C148.741 76.2055 149.22 76.6219 149.259 77.1728L150.741 98.0683C150.974 101.359 148.495 104.207 145.204 104.43L125.185 105.784C121.894 106.007 119.036 103.52 118.803 100.229L117.321 79.3333Z" fill="#F49000" />
                        <path d="M120.127 81.1623C120.088 80.6114 120.503 80.1346 121.054 80.0973L145.669 78.4322C146.22 78.3949 146.698 78.8113 146.737 79.3622L147.934 96.2394C148.168 99.5302 145.689 102.378 142.397 102.601L127.707 103.595C124.415 103.818 121.558 101.33 121.324 98.0394L120.127 81.1623Z" fill="#B16900" />
                        <path d="M122.5 101.03C119 95.5295 120.839 87.0086 120.839 87.0086C134.922 90.7475 135.714 95.4895 140.5 102.5C140.5 102.5 137.533 103.353 134 103.366C126.5 103.395 124.399 104.013 122.5 101.03Z" fill="#FFB8D1" stroke="#FFB8D1" strokeWidth="0.2" />
                        <path d="M133.205 66.3529C119.725 67.8146 116.928 81.7389 116.928 81.7389L152.365 78.6042C152.365 78.6042 146.905 64.8674 133.205 66.3529Z" fill="#FFC200" />
                        <path d="M131.795 67.8029C128.01 68.3673 127.157 71.7693 127.157 71.7693L137.104 70.4565C137.104 70.4565 135.642 67.2294 131.795 67.8029Z" fill="#FFD292" />
                        <path d="M144.765 60.6283C145.223 65.7712 147.675 65.6494 151.625 65.3138C155.575 64.9781 158.384 64.6029 157.926 59.4599C157.467 54.317 156.287 46.1524 149.965 46.6896C143.644 47.2268 144.307 55.4854 144.765 60.6283Z" fill="black" />
                        <path d="M111.265 62.9651C111.723 68.1081 114.175 67.9863 118.125 67.6506C122.075 67.315 124.884 66.9397 124.426 61.7967C123.967 56.6538 122.787 48.4892 116.465 49.0264C110.144 49.5636 110.807 57.8222 111.265 62.9651Z" fill="black" />
                        <path className='pata' d="M214.936 196.14C211.421 192.075 205.276 191.629 201.211 195.144L192.44 202.729C188.375 206.244 187.93 212.388 191.445 216.453V216.453C194.96 220.518 201.104 220.964 205.169 217.449L213.94 209.864C218.005 206.349 218.451 200.205 214.936 196.14V196.14Z" fill="#F49000" />
                        <path className='pata' d="M79.2651 208.746C81.6207 203.916 87.4458 201.91 92.2759 204.265L102.698 209.348C107.528 211.703 109.534 217.529 107.178 222.359V222.359C104.823 227.189 98.9977 229.195 94.1676 226.839L83.7456 221.756C78.9155 219.401 76.9096 213.576 79.2651 208.746V208.746Z" fill="#F49000" />
                    </svg>
                    <h1 className='text-gray-500 text-xl font-bold'>LinHub</h1>

                    <div id="login" className="border-4 rounded border-gray-200 drop-shadow-md p-5 ">
                        

                        <form className="border-b border-purple-900 text-3xl text-purple-900 flex flex-column justify-center items-center" id="loginform">
                            <p className="">Ingresa a tu cuenta</p>


                            <div className="border-y border-purple-900 mt-3 mb-4 w-full">
                                <input
                                    className="mt-3 block w-full h-10 px-2 py-1 border border-gray-300 rounded-md font-overpass text-base text-gray-700 focus:outline-none focus:border-purple-500"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    onChange={handleChange}
                                />
                                
                                <input
                                    className="my-3  block w-full h-10 px-2 py-1 border border-gray-300 rounded-md font-overpass text-base text-gray-700 focus:outline-none focus:border-purple-500"
                                    type="password"
                                    placeholder={store.currentIdiom === "Español" ? "Contraseña" : "Password"}
                                    name="password"
                                    required
                                    onChange={handleChange}
                                />
                                
                            </div>
 
                            <button
                                className="mt-2 bg-purple-900 hover:bg-purple-700 text-purple-200 hover:text-purple-50 font-overpass text-base font-semibold py-2 px-4 rounded inline-flex items-center"
                                type="submit"
                                title="Ingresar"
                                name="Ingresar"
                                onClick={(e) => handleLogin(e)}
                            >
                                Login
                            </button><br />
                            {error && <small>invalid email or password</small>}
                        </form>
                        <div className="pie-form flex justify-center ">
                            {/* <Link className="mt-4 text-purple-900" to="">{store.currentIdiom === "Español" ? '¿Perdiste tu contraseña?' : 'Lost your Password?'}</Link><br /> */}
                            <Link className="mt-2 text-purple-900" to="/signup">{store.currentIdiom === "Español" ? '¿No tienes Cuenta? Registrate' : 'Need an account Register'}</Link>
                        </div>
                       
                    </div>

                    <div className="flex justify-between items-center">
                            <Link to="/">{store.currentIdiom === "Español" ? "Volver" : "Go Back"}</Link>
                            
                    </div>
                
    
            </div>

            
                   
        </>
    );
}