import React from 'react'
import { useContext } from 'react'
import { Context } from '../../store/appContext'

const UserCard = ({ username, nativeIdiom, learnIdiom }) => {

    const { store, actions } = useContext(Context)

    return (
        <div className='flex flex-col justify-between relative mt-6 min-h-80 min-w-72 border-1 rounded-lg'>
            <img src='' className='flag absolute h-10 w-10 bg-orange-300 rounded-full top-1 start-1'/>
            <div className='absolute w-100 bottom-0'>
                <div className='bg-zinc-400 mb-2 w-75 m-auto text-start w-50 text-sm p-2 rounded-lg'>
                    <p className='text-white'>{username}</p>
                    <p className='text-white'>{store.currentIdiom == "Español" ? "Quiere aprender: " : "Wants to learn: "} <strong>{learnIdiom}</strong></p>
                    <p className='text-white'>{store.currentIdiom == "Español" ? "Nativo en: " : "Native in: "}<strong>{nativeIdiom}</strong></p>
                </div>
                <button className='btn btn-primary w-100'>Connect</button>
            </div>
        </div>
    )
}

const BottomSection = () => {
    return (
        <div className='container text-center my-2 py-4'>
            <h1 className='text-6xl font-bold text-violet-500'>Language Exchange</h1>
            <div className='flex flex-row justify-center align-center'>
                <UserCard username={"Diana Roo"} nativeIdiom={"Español"} learnIdiom={"English"} />
                <img className='mx-4' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/sectionh_five.svg' alt='LinHub Eyes' />
                <UserCard username={"Santi Diaz"} nativeIdiom={"English"} learnIdiom={"Spanish"} />
            </div>
        </div>
    )
}

export default BottomSection