import React from 'react'
import { useContext } from 'react'
import { Context } from '../../store/appContext'
import modelPersonOne from '/workspaces/LinHub_Final_Project/src/front/img/model_person_one.jpg'
import modelPersonTwo from '/workspaces/LinHub_Final_Project/src/front/img/model_person_two.jpg'

const UserCard = ({ username, nativeIdiom, learnIdiom, countryFrom, profilePic }) => {

    const { store, actions } = useContext(Context)

    const profileStyles = {
        'backgroundImage': `url(${profilePic})`,
        'backgroundSize': 'cover',
        'backgroundPosition': 'bottom'
    }

    return (
        <div className='flex flex-col justify-between relative mt-6 min-h-96 min-w-72 border-0 rounded-lg' style={profileStyles}>
            <img src={countryFrom} className='flag absolute h-10 w-10 bg-orange-300 rounded-full top-1 start-1' />
            <div className='absolute w-100 bottom-0'>
                <div className='bg-transparency-2 bg-black mb-2 w-75 m-auto text-start w-50 text-sm p-2 rounded-lg'>
                    <p className='text-white'>{username}</p>
                    <p className='text-white'>{store.currentIdiom == "Español" ? "Quiere aprender: " : "Wants to learn: "} <strong>{learnIdiom}</strong></p>
                    <p className='text-white'>{store.currentIdiom == "Español" ? "Nativo en: " : "Native in: "}<strong>{nativeIdiom}</strong></p>
                </div>
                <button className='bg-transparency-1 btn btn-light w-100 font-bold'>Conectar</button>
            </div>
        </div>
    )
}

const BottomSection = () => {
    const { store, actions } = useContext(Context)

    return (
        <div className='text-center my-12 py-4 bg-gradient-to-b from-white to-purple-800'>
            <h1 className='text-6xl font-bold text-violet-500'>{store.currentIdiom == "Español" ? "Intercambio de idomas: " : "Lenguage exchange: "}</h1>
            <div className='flex flex-row justify-center align-center py-32'>
                <UserCard
                    username={"Diana Roo"}
                    nativeIdiom={"English"}
                    learnIdiom={"Español"}
                    countryFrom={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy7ISNR7kNLV8sJHhxDWaRBKir0vkiUgrpmw&s'}
                    profilePic={modelPersonTwo}
                />
                <img className='mx-4' src='https://raw.githubusercontent.com/4GeeksAcademy/LinHub_Final_Project/main/src/front/img/sectionh_five.svg' alt='LinHub Eyes' />
                <UserCard
                    username={"Santi Diaz"}
                    nativeIdiom={"Español"}
                    learnIdiom={"English"}
                    countryFrom={'https://enciclopediadehistoria.com/wp-content/uploads/2022/07/bandera-de-colombia.jpg'}
                    profilePic={modelPersonOne}
                />
            </div>
        </div>
    )
}

export default BottomSection