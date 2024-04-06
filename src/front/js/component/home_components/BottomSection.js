import React from 'react'
import { useContext } from 'react'
import { Context } from '../../store/appContext'

const UserCard = ({ username, nativeIdiom, learnIdiom }) => {

    const { store, actions } = useContext(Context)

    return (
        <div className='relative mt-6 min-h-36 border-1'>
            <div className='flag'></div>
            <div>
                <p>{username}</p>
                <p>{store.currentIdiom == "Español" ? "Quiere aprender: " : "Wants to learn: "} {learnIdiom}</p>
                <p>{store.currentIdiom == "Español" ? "Nativo en: " : "Native in: "}{nativeIdiom}</p>
            </div>
        </div>
    )
}

const BottomSection = () => {
    return (
        <div className='container text-center mt-4'>
            <h1 className='text-6xl font-bold text-violet-500'>Language Exchange</h1>
            <div className='flex flex-row justify-around align-center'>
                <UserCard username={"Diana Roo"} nativeIdiom={"Español"} learnIdiom={"English"} />
                <img></img>
                <UserCard username={"Luis Miguel"} nativeIdiom={"English"} learnIdiom={"Spanish"} />
            </div>
        </div>
    )
}

export default BottomSection