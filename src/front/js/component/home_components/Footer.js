import React, { useContext } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';


const Footer = () => {
    const { store } = useContext(Context);
    const { currentIdiom } = store;

    return (
        <div id='hero-body' className="flex justify-center items-center mt-12 py-12 border-t-2">
            Made With Love By
            <Link className='mx-3' to="https://github.com/josema-git">Jose</Link>
            <Link className='mx-3' to="https://github.com/DianaJRoo">Diana</Link>
            <Link className='mx-3' to="https://github.com/Diaz1010">Santi</Link>
            <Link className='mx-3' to="https://github.com/lumi-tip">LuMi</Link>
        </div>
    );
};

export default Footer;