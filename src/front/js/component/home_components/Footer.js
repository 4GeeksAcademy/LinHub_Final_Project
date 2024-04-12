import React, { useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';


const Footer = () => {
    const { store } = useContext(Context);
    const { currentIdiom } = store;

    return (
        <div id='hero-body' className="flex justify-center items-center py-12 border-t-2">
            Made With Love By
            <a className='mx-3' href="https://github.com/josema-git">Jose</a>
            <a className='mx-3' href="https://github.com/DianaJRoo">Diana</a>
            <a className='mx-3' href="https://github.com/Diaz1010">Santi</a>
            <a className='mx-3' href="https://github.com/lumi-tip">LuMi</a>
        </div>
    );
};

export default Footer;