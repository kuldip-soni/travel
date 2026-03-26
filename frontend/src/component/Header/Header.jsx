import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/assets/image/Logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/auth.slice';

function Header(props) {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    console.log(auth);


    return (
        <header>
            <div className="container header-container">
                <a href="./index.html" className="logo">
                    <img src={logo} alt="logo" />
                </a>
                <nav className="nav-bar">
                    <i className="fa-solid fa-bars menubars" onClick="handleMenu()" />
                    <ul id="menu">
                        <i className="fa-solid fa-xmark xmarkbar" onClick="handleMenu()" />
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About Us</NavLink></li>
                        <li><NavLink to='/location'>Location</NavLink></li>
                        <li><NavLink to='/package'>Package</NavLink></li>





                        <li><a href="#">Contact</a></li>
                        <li>
                            <a href="#"><i className="fa-solid fa-magnifying-glass" /></a>
                        </li>
                        <li>
                            {
                                auth.user ? <a onClick={() => dispatch(logout())}>Logout</a> :
                                    <NavLink to='/login'>Login</NavLink>
                            }

                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    );
}

export default Header;