import React from 'react'
import logo from '../../../img/logo.svg'

const Navbar = () => {
    return (
        <>
            <nav className='d-flex justify-content-around'>
                <div>
                    <img src={logo} alt='logo de linhub' />
                    <h1>Logo</h1>
                </div>
                <h1>drop down</h1>
            </nav>
        </>
    )
}

export default Navbar