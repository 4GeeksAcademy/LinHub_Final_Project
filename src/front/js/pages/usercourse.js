import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { FaFireFlameCurved } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";



import LoggedNavbar from '../component/usercourse_components/LoggedNav'

// const SidebarButton = ({ text, handleClick }) => {
//     return (
//         <button
//             id='boton-pageOne'
//             type="button"
//             className="block m-auto mt-5 text-center m-0 p-3 h-14 rounded-xl border-0 w-full md:w-96 mt-10"
//             onClick={handleClick}
//         >
//             {text}
//         </button>
//     );
// };

// const LessonItem = ({ title, isCompleted, id }) => {
//     const navigate = useNavigate()

//     return (
//         <div className='cursor-pointer flex items-center justify-between bg-gray-100 mt-3 rounded-xl p-8 text-3xl' onClick={() => navigate(`/exercise/${id}`)}>
//             <span className='ms-5'><strong>{title}</strong></span>
//             {/* <button id='boton-pageOne1' className={`rounded-full py-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold px-4`} ></button> */}
//         </div>
//     );
// };

export const UserCourse = () => {

    const { store, actions } = useContext(Context)
    const [lessons, setLessons] = useState({
        'user': {},
        'data': []
    })
    const navigate = useNavigate()

    useEffect(() => {
        if (store.userToken) {
            const currentUser = async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + "/api/courseinfo", {
                        method: "GET",

                        headers: {
                            "Access-Control-Allow-Credentials": true,
                            "Authorization": 'Bearer ' + store.userToken.token
                        }
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error("Invalid credentials");

                    setLessons(data)
                } catch (error) {
                    console.error("logging in", error);
                    navigate('/')
                    return false;
                }
            }
            currentUser()
        }
    }, [])

    console.log("SOY LESSONS USER", lessons.user)
    console.log("SOY USER LESSONS DATA", lessons.data)
    console.log(lessons.data.learning_language)

    return (
        <>
            <LoggedNavbar
                userImage={lessons.user.image}
                username={lessons.user.first_name + ' ' + lessons.user.last_name}
                language={lessons.user.learning_language == 1 ? "English" : "Español"}
            />
            <div className='usercourse-container'>
                <div className='usercourse-container-left'>

                    {lessons.data &&
                        lessons.data.map((lesson, index) => {
                            return (
                                <div className='usercourse-lesson' key={index}>
                                    <div className='lesson-background'>
                                        <p className='text-white text-9xl'>{index + 1}</p>
                                    </div>
                                    <div className='px-4'>
                                        <p className='text-xl'>{lesson.lesson_name}</p>
                                    </div>
                                    <div className='px-4 pb-2'>
                                        <button
                                            className='py-2 px-4 text-white bg-blue-500 rounded-xl'
                                            onClick={() => navigate(`/exercise/${lesson.lesson_id}`)}
                                        >
                                            {lessons.user.learning_language === 1 ? "Entrar" : "Join"}
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className='usercourse-container-right'>
                    <div className='d-flex justify-around mb-4'>
                        <div className='flex items-center'>
                            <FaFireFlameCurved className='text-red-500 text-2xl' />
                            <p className="text-xs ps-1">{lessons.user.streak}</p>
                        </div>
                        <div className='flex items-center'>
                            <FaHeartbeat className='text-red-500 text-2xl' />
                            <p className="text-xs ps-1">{lessons.user.lives}</p>
                        </div>
                        {lessons.user.learning_language == 1 ?
                            <img className='rounded-lg h-10 w-12' src='https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg' />
                            :
                            <img className='rounded-lg h-10 w-12' src='https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/640px-Flag_of_Spain.svg.png' />
                        }
                    </div>
                    <div className='p-2 bg-amber-200 rounded-2xl w-100 text-center'>
                        <p>Conecta con estos usuarios</p>
                    </div>
                </div>
            </div>
        </>
        // <div className="flex justify-between p-8" style={{ minHeight: '89vh' }}>
        //     <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-xl">
        //         <Link to="/userprofile">
        //             <SidebarButton text={store.userToken.identity.username} />
        //         </Link>
        //         <SidebarButton text="Chats" />
        //         <SidebarButton text="Peticiones" />
        //         <div className="border border-gray-300 p-4 rounded-2xl shadow-lg mt-12">
        //             <h2 className="text-lg font-semibold mb-2">
        //                 <SidebarButton text="Agenda Clase Privada!" />
        //             </h2>
        //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra enim nec tincidunt hendrerit.</p>
        //         </div>
        //         <SidebarButton text="Log out" handleClick={() => actions.logOut()} />
        //     </div>
        //     <div className="hidden md:block w-2/3 bg-white-300 p-4">
        //         <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden flex p-3">
        //             <div className="absolute left-0 top-0 h-full bg-violet-500 animate-progress-stripes" style={{ width: '65%' }}></div>
        //         </div>

        //         {lessons.user &&
        //             <div className='flex flex-row justify-around mt-3'>
        //                 <p> {lessons.user.lives} <FontAwesomeIcon icon={faHeart} size="2xl" style={{ color: "#ff3d3d", }} /></p>
        //                 <p> {lessons.user.streak} <FontAwesomeIcon icon={faFire} size="2xl" style={{ color: "#ff9a57" }} />  </p>
        //                 {store.userToken.learning_language == "English" ?
        //                     < img src='https://static.wikia.nocookie.net/duolingo/images/7/79/Ingles.png/revision/latest?cb=20230710181050&path-prefix=es' style={{ width: '40px' }} />
        //                     :
        //                     < img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Bandera_de_Espa%C3%B1a.svg' style={{ width: '40px' }} />
        //                 }
        //             </div>
        //         }

        //         {lessons.data &&
        //             lessons.data.map(lesson => {
        //                 return (
        //                     <LessonItem key={lesson.lesson_id} title={lesson.lesson_name} id={lesson.lesson_id} />
        //                 )
        //             })
        //         }
        //     </div>
        // </div>
    );
};
