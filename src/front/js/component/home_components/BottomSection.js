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
            <div className='person-wrapper absolute w-full bottom-0'>
                <div className='bg-transparency-2 bg-black mb-2 w-3/4 m-auto text-start w-50 text-sm p-2 rounded-lg'>
                    <p className='text-white'>{username}</p>
                    <p className='text-white'>{store.currentIdiom == "Español" ? "Quiere aprender: " : "Wants to learn: "} <strong>{learnIdiom}</strong></p>
                    <p className='text-white'>{store.currentIdiom == "Español" ? "Nativo en: " : "Native in: "}<strong>{nativeIdiom}</strong></p>
                </div>
                <button className='contact-button border-0 bg-slate-100 py-2 w-full font-bold rounded-lg'>{store.currentIdiom == "Español" ? "Conectar" : "Conect"}</button>
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
                <svg className="illustration" width="123" height="92" viewBox="0 0 123 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Frame 1">
                        <path id="Rectangle 12" d="M107.389 4.23919C93.9248 3.16355 77.6543 11.8865 63.3311 10.7428C49.0079 9.59907 48.2705 5.7238 20.3587 3.65208C-7.55318 1.58036 -4.38838 84.352 29.9264 88.2622C40.9114 89.5139 53.0685 68.3964 64.1118 69.0881C75.0529 69.7735 84.4076 86.5492 95.3654 86.6221C129.934 86.8522 127.422 5.83949 107.389 4.23919Z" fill="#D9D9D9" />
                        <path id="Ellipse 15" d="M68.4543 58.6641C68.439 74.1287 73.584 75.6082 86.2038 76.7472C100.074 77.0297 106.608 74.6655 106.623 59.2008C106.638 43.7362 107.308 20.4836 87.7014 19.6837C69.2801 18.932 68.4695 43.1994 68.4543 58.6641Z" fill="white" />
                        <path id="Ellipse 16" d="M17.1659 58.0638C17.1506 73.5285 22.2956 75.008 34.9154 76.147C48.7856 76.4294 55.3194 74.0653 55.3347 58.6006C55.35 43.1359 56.0195 19.8834 36.413 19.0834C17.9918 18.3318 17.1812 42.5992 17.1659 58.0638Z" fill="white" />
                        <path id="Polygon 10" d="M61.9113 68.1921C41.5663 68.8709 35.8204 89.4039 35.8204 89.4039L89.2232 88.6793C89.2232 88.6793 82.5871 67.5023 61.9113 68.1921Z" fill="#FFC200" />
                        <path id="Polygon 11" d="M59.8304 70.1486C54.0918 70.439 52.3203 75.3977 52.3203 75.3977L67.3755 74.8889C67.3755 74.8889 65.6623 69.8535 59.8304 70.1486Z" fill="#FFD292" />
                        <path id="Ellipse 17" d="M80.2571 61.3226C80.1907 69.074 83.8723 69.2501 89.8228 69.3254C95.7733 69.4007 100.026 69.2502 100.092 61.4988C100.158 53.7475 99.5873 41.3758 90.0631 41.2553C80.5388 41.1348 80.3234 53.5713 80.2571 61.3226Z" fill="#4B4B4B" />
                        <path id="Ellipse 18" d="M29.8611 59.922C29.7947 67.6733 33.4763 67.8495 39.4268 67.9247C45.3773 68 49.6296 67.8495 49.696 60.0982C49.7623 52.3469 49.1913 39.9752 39.6671 39.8547C30.1428 39.7342 29.9274 52.1707 29.8611 59.922Z" fill="#4B4B4B" />
                        <g id="Group_13">
                            <path id="Ellipse 19" d="M23.0054 48.1012C23.0007 52.8647 24.8196 53.324 29.281 53.6838C34.1843 53.7806 36.4941 53.057 36.4988 48.2935C36.5035 43.53 36.7391 36.3681 29.8079 36.1078C23.2956 35.8633 23.0101 43.3377 23.0054 48.1012Z" fill="white" />
                        </g>
                        <g id="Group_12">
                            <path id="Ellipse 20" d="M74.0536 48.0863C74.0489 52.8498 75.8678 53.3091 80.3292 53.6689C85.2326 53.7658 87.5423 53.0422 87.547 48.2787C87.5517 43.5151 87.7873 36.3532 80.8561 36.0929C74.3438 35.8484 74.0583 43.3228 74.0536 48.0863Z" fill="white" />
                        </g>
                    </g>
                </svg>
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