import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircleFill } from "react-icons/pi";
import LoggedNavbar from '../component/usercourse_components/LoggedNav'
import { IoIosInformationCircleOutline } from "react-icons/io";

import FeedbackMsg from '../component/usercourse_components/FeedbackMsg';
import Lesson from '../component/usercourse_components/Lesson';
import LivesAndStreak from '../component/usercourse_components/LivesAndStreak';
import RightBarTitle from '../component/usercourse_components/RightBarTitle';
import Friend from '../component/usercourse_components/Friend';

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
    })

    const [recommInfo, setRecommInfo] = useState(false)


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
    }, [sendRequest])


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
            setSendRequest(!sendRequest)

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
            setSendRequest(!sendRequest)

            setTimeout(() => {
                setFeedBackMsg({ state: "", render: false, msg: "Request Accepted" });
            }, 3000);

        } catch (error) {
            setFeedBackMsg({
                "state": "error",
                "render": true,
                "msg": "Request already accepted (refresh)"
            })

            setTimeout(() => {
                setFeedBackMsg({ state: "", render: false, msg: "Request already accepted (refresh)" });
            }, 3000);
        }
    }

    const handleChat = async (sender_id) => {
        try {
            const res = await fetch(process.env.BACKEND_URL + `/api/get_chat/${sender_id}`, {
                method: "GET",

                headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Authorization": 'Bearer ' + store.userToken.token
                }
            });

            if (!res.ok) throw Error;
            const data = await res.json()
            store.currentFriend = data.user
            navigate(`/chat/${data.chat_id}`)
        } catch (error) {
            console.log(error)
        }
    }

    //-------- IMPORTANT LOGS ----------------

    // console.log("SOY LESSONS USER", lessons.user)
    // console.log("SOY LESSONS PROGRESS", lessons.progress)
    // console.log("SOY USER LESSONS DATA", lessons.data)
    // console.log("SOY FRIENDS", friends)

    return (
        <div>
            <LoggedNavbar
                userImage={lessons.user.image}
                username={lessons.user.first_name + ' ' + lessons.user.last_name}
                language={lessons.user.learning_language == 1 ? "English" : "Español"}
            />
            {feedbackMsg.render ?
                <FeedbackMsg msg={feedbackMsg.msg} state={feedbackMsg.state} opacity={1} transform={"translateX(-50%)"} transition={"opacity 0.3s"} />
                :
                <FeedbackMsg msg={feedbackMsg.msg} state={feedbackMsg.state} opacity={0} transition={"all 0.3s"} />
            }

            <div className='usercourse-container p-0'>
                <div className='usercourse-container-left'>
                    {lessons.data &&
                        lessons.data.map((lesson, index) => {
                            return (
                                <Lesson
                                    index={index}
                                    name={lesson.lesson_name}
                                    description={lesson.description ? lesson.description : ""}
                                    id={lesson.lesson_id}
                                    button={lessons.user.learning_language === 1 ? "Entrar" : "Join"}
                                    userProgress={lessons.progress}
                                    progressRequired={lesson.progress}
                                />
                            )
                        })
                    }
                </div>

                <div className='relative usercourse-container-right'>

                    <div className='flex justify-around mb-4'>
                        <LivesAndStreak
                            type="fire"
                            info={lessons.user.streak}
                            description={lessons.user.native_language == 1 ?
                                "Keep your streak going by login in every day and unlock special prizes, like badges and discounts."
                                :
                                "Mantén tu racha activa logeadote todos los días y desbloquea premios especiales, como insignias y descuentos."
                            }
                        />
                        <LivesAndStreak
                            type="heart"
                            info={lessons.user.lives}
                            description={lessons.user.native_language == 1 ?
                                "Gain lives to continue playing. Lives recharge every hour, and you lose one when you give a wrong answer in lessons."
                                :
                                "Aumenta vidas para seguir jugando. Las vidas se recargan cada hora, y pierdes una cuando das una respuesta incorrecta en las lecciones."
                            }
                        />
                        {lessons.user.learning_language == 1 ?
                            <img className='rounded-lg h-10 w-12' src='https://cdn.britannica.com/33/4833-004-828A9A84/Flag-United-States-of-America.jpg' />
                            :
                            <img className='rounded-lg h-10 w-12' src='https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/640px-Flag_of_Spain.svg.png' />
                        }
                    </div>


                    <div className='mb-4 flex flex-col'>
                        <RightBarTitle title={lessons.user.native_language == 1 ? "Your Friends" : "Tus Amigos"} />

                        <div className='p-2 rounded-2xl w-100'>
                            {friends.friends && friends.friends.length > 0 ?
                                friends.friends.map((friend, index) => {
                                    return (
                                        <Friend
                                            friend={friend}
                                            index={index}
                                            handleChat={handleChat}
                                            buttonInfo={lessons.user.native_language == 1 ? "Start Chat" : "Iniciar Chat"}
                                        />
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
                            {friends.pending &&
                                friends.pending.length > 0 &&
                                friends.pending.filter(e => e.sender.id !== lessons.user.id).length > 0 ?
                                friends.pending.filter(e => e.sender.id !== lessons.user.id).map((friend, index) => {
                                    return (
                                        <div key={index} className="flex justify-around items-center border-1 rounded-xl py-1 shadow-5">
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

                    <div className='realtive flex flex-col'>
                        <p className='relative p-2 bg-amber-200 rounded-2xl w-100 text-center mb-2'>
                            {lessons.user.native_language == 1 ? "Recommended users" : "Amigos Recomendados"}
                            <IoIosInformationCircleOutline className='absolute right-2 top-1 text-xl' onMouseEnter={() => setRecommInfo(true)} onMouseLeave={() => setRecommInfo(false)} />
                            {recommInfo &&
                                <div className='absolute top-14 w-100 border-1 rounded-xl shadow-5 py-4 left-0 bg-white'>
                                    {lessons.user.native_language == 1 ?
                                        "It will only appear as recommended users people that are native in the language you are learning"
                                        :
                                        "Apareceran como recomendados unicamente personas que sean nativas en el idioma que esta aprendiendo"}
                                </div>
                            }
                        </p>
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
        </div>
    );
};
