import React from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <header>
            <div className="container header-container">
                <a href="./index.html" className="logo">
                    <img src="./assets/image/Logo.png" alt="logo" />
                </a>
                <nav className="nav-bar">
                    <i className="fa-solid fa-bars menubars" onClick="handleMenu()" />
                    <ul id="menu">
                        <i className="fa-solid fa-xmark xmarkbar" onClick="handleMenu()" />
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About Us</NavLink></li>
                        <li><NavLink to='/location'>Location</NavLink></li>


                        
                        <li><a href="#">Contact</a></li>
                        <li>
                            <a href="#"><i className="fa-solid fa-magnifying-glass" /></a>
                        </li>
                        <li><NavLink to='/register'>Register</NavLink></li>
                        <li><NavLink to='/login'>Login</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>

    );
}

export default Header;