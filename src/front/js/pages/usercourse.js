import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { FaFireFlameCurved } from "react-icons/fa6";
import { PiUserCircleFill } from "react-icons/pi";
import { FaHeartbeat } from "react-icons/fa";
import LoggedNavbar from '../component/usercourse_components/LoggedNav'

export const UserCourse = () => {

    //--------- CONTEXT ----------------

    const { store, actions } = useContext(Context)

    //---------- USE STATES --------------
    const [lessons, setLessons] = useState({
        'user': {},
        'data': []
    })

    const [friends, setFriends] = useState({})

    const [sendRequest, setSendRequest] = useState(false)

    const [feedbackMsg, setFeedBackMsg] = useState({
        "state": "",
        "render": false,
        "msg": ""
    })//AAAAAAAA


    //--------- NAVIGATE ------------
    const navigate = useNavigate()


    //-------- USE EFFECTS ---------
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

    useEffect(() => {
        if (store.userToken) {
            const currentUser = async () => {
                try {
                    const res = await fetch(process.env.BACKEND_URL + "/api/friends_and_requests", {
                        method: "GET",

                        headers: {
                            "Access-Control-Allow-Credentials": true,
                            "Authorization": 'Bearer ' + store.userToken.token
                        }
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error("Invalid credentials");

                    setFriends(data)
                } catch (error) {
                    console.error("logging in", error);
                    navigate('/')
                    return false;
                }
            }
            currentUser()
        }
    }, [])


    //-------- FUNCTIONS ------------

    const sendFriendRequest = async (receiver_id) => {
        try {
            const res = await fetch(process.env.BACKEND_URL + `/api/send_request/${receiver_id}`, {
                method: "GET",

                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": 'Bearer ' + store.userToken.token
                }
            });

            if (!res.ok) throw Error;

            setFeedBackMsg({
                "state": "success",
                "render": true,
                "msg": "Request Sent"
            })

            setTimeout(() => {
                setFeedBackMsg({ state: "", render: false, msg: "Request Sent" });
            }, 3000);

        } catch (error) {
            setFeedBackMsg({
                "state": "error",
                "render": true,
                "msg": "User already added or requested"
            })

            setTimeout(() => {
                setFeedBackMsg({ state: "", render: false, msg: "User already added or requested" });
            }, 3000);
        }
    }

    const acceptRequest = async (request_id) => {
        try {
            const res = await fetch(process.env.BACKEND_URL + `/api/accept_requests/${request_id}`, {
                method: "GET",

                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": 'Bearer ' + store.userToken.token
                }
            });

            if (!res.ok) throw Error;

            setFeedBackMsg({
                "state": "success",
                "render": true,
                "msg": "Request Accepted"
            })

            setTimeout(() => {
                setFeedBackMsg({ state: "", render: false, msg: "Request Accepted" });
            }, 3000);

        } catch (error) {
            setFeedBackMsg({
                "state": "error",
                "render": true,
                "msg": "Error Accepting"
            })

            setTimeout(() => {
                setFeedBackMsg({ state: "", render: false, msg: "Error Accepting" });
            }, 3000);
        }
    }


    //-------- IMPORTANT LOGS ----------------

    console.log("SOY LESSONS USER", lessons.user)
    // console.log("SOY USER LESSONS DATA", lessons.data)
    console.log("SOY FRIENDS", friends)

    return (
        <>
            <LoggedNavbar
                userImage={lessons.user.image}
                username={lessons.user.first_name + ' ' + lessons.user.last_name}
                language={lessons.user.learning_language == 1 ? "English" : "Español"}
            />
            {feedbackMsg.render ?
                <div className='absolute inset-x-0 top-8 left-1/2 text-white w-72 text-center p-2 rounded-xl'
                    style={{
                        background: feedbackMsg.state === "success" ? "#81bf4d" : "#ea6a6f",
                        opacity: 1,
                        transition: "opacity 0.3s",
                        transform: "translateX(-50%)",
                    }}
                >
                    {feedbackMsg.msg}
                </div>
                :
                <div className='absolute inset-x-0 top-8 left-1/2 text-white w-72 text-center p-2 rounded-xl'
                    style={{
                        opacity: 0,
                        transition: "all 1s",
                    }}
                >
                    {feedbackMsg.msg}
                </div>
            }
            <div className='usercourse-container'>
                <div className='usercourse-container-left'>

                    {lessons.data &&
                        lessons.data.map((lesson, index) => {
                            return (
                                <div className='usercourse-lesson' key={index}>
                                    <div className='lesson-background'>
                                        <p className='text-white text-9xl'>{index + 1}</p>
                                    </div>
                                    <div className='px-4 flex flex-col'>
                                        <p className='text-xl'>{lesson.lesson_name}</p>
                                        <p className='text-slate-400'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
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
                    <div className='mb-4 flex flex-col'>
                        <p className='p-2 bg-amber-200 rounded-2xl w-100 text-center mb-2'>{lessons.user.native_language == 1 ? "Your Friends" : "Tus Amigos"}</p>
                        <div className='p-2 rounded-2xl w-100'>
                            {friends.friends && friends.friends.length > 0 ?
                                friends.friends.map(friend => {
                                    return (
                                        <div className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
                                            <div className='flex items-center'>
                                                {friend.sender.image ? <img className='rounded-full w-12 h-12 object-cover' src={friend.sender.image}></img> : <PiUserCircleFill className='text-5xl' />}
                                                <p className='ms-1'>{friend.sender.username}</p>
                                            </div>
                                            <button className='bg-red-400 p-2 rounded-lg text-white text-xs h-10'>{lessons.user.native_language == 1 ? "Start Chat" : "Iniciar Chat"}</button>
                                        </div>
                                    )
                                })
                                :
                                <div className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
                                    <p className='ms-1 p-2 text-center'>{lessons.user.native_language == 1 ? `No friends yet Have a look to the recomended` : `No tienes amigos aún mira la seccion de recomendados`}</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='mb-4 flex flex-col'>
                        <p className='p-2 bg-amber-200 rounded-2xl w-100 text-center mb-2'>{lessons.user.native_language == 1 ? "Requests" : "Solicitudes"}</p>
                        <div className='p-2 rounded-2xl w-100'>
                            {friends.pending && friends.pending.length > 0 ?
                                friends.pending.map(friend => {
                                    return (
                                        <div className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
                                            <div className='flex items-center'>
                                                {friend.sender.image ? <img className='rounded-full w-12 h-12 object-cover' src={friend.sender.image}></img> : <PiUserCircleFill className='text-5xl' />}
                                                <p className='ms-1'>{friend.sender.username}</p>
                                            </div>
                                            <button onClick={() => acceptRequest(friend.id)} className='bg-green-400 p-2 rounded-lg text-white text-xs h-10'>{lessons.user.native_language == 1 ? "Accept" : "Aceptar"}</button>
                                        </div>
                                    )
                                })
                                :
                                <div className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
                                    <p className='ms-1 p-2 text-center'>{lessons.user.native_language == 1 ? `No friends yet Have a look to the recomended` : `No tienes amigos aún mira la seccion de recomendados`}</p>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='flex flex-col'>
                        <p className='p-2 bg-amber-200 rounded-2xl w-100 text-center mb-2'>{lessons.user.native_language == 1 ? "Recommended users" : "Amigos Recomendados"}</p>
                        <div className='p-2 rounded-2xl w-100'>
                            {friends.recommended_users && friends.recommended_users.length > 0 ?
                                friends.recommended_users
                                    .map((friend, index) => {
                                        return (
                                            <div key={index} className="flex justify-between items-center border-1 rounded-xl py-1 shadow-5 pe-4 mb-1">
                                                <div className='flex items-center ps-2'>
                                                    {friend.image ? <img className='rounded-full w-12 h-12 object-cover' src={friend.image}></img> : <PiUserCircleFill className='text-5xl' />}
                                                    <p className='ms-1'>{friend.username}</p>
                                                </div>
                                                <button onClick={() => sendFriendRequest(friend.id)} className='bg-red-400 p-2 rounded-lg text-white text-xs h-10'>
                                                    {lessons.user.native_language == 1 ?
                                                        "Send Request"
                                                        :
                                                        "Enviar Invitación"
                                                    }
                                                </button>
                                            </div>
                                        )
                                    })
                                :
                                <div className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
                                    <p className='ms-1 p-2 text-center'>{lessons.user.native_language == 1 ? `We have no recommendations you are so popular` : `Sin recomendaciones por aca, eres muy popular`}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
