import React from 'react';

function Header(props) {
    return (
        <header>
            <div className="container header-container">
                <a href="./index.html" className="logo">
                    <img src="./assets/image/Logo.png" alt="logo" />
                </a>
                <nav className="nav-bar">
                    <i className="fa-solid fa-bars menubars" onclick="handleMenu()" />
                    <ul id="menu">
                        <i className="fa-solid fa-xmark xmarkbar" onclick="handleMenu()" />
                        <li><a href="./index.html">Home</a></li>
                        <li><a href="./About Us.html">About Us</a></li>
                        <li>
                            <a href="./Package.html">Package <i className="fa-solid fa-chevron-down" /></a>
                            <ul className="Products-items">
                                <li><a href="./Package-Detial.html">Package Detial</a></li>
                                <li><a href="./Package.html">Package</a></li>
                                <li><a href="#">Package Detial</a></li>
                                <li><a href="#">Package</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Destination <i className="fa-solid fa-chevron-down" /></a>
                            <ul className="Products-items">
                                <li><a href="#">Destination</a></li>
                                <li><a href="#">Destintion detail</a></li>
                                <li><a href="#">Destination</a></li>
                                <li><a href="#">Destintion detail</a></li>
                            </ul>
                        </li>
                        <li>
                            <a href="#">Blog <i className="fa-solid fa-chevron-down" /></a>
                            <ul className="Products-items">
                                <li><a href="#">Single Blog</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Single Blog</a></li>
                                <li><a href="#">Blog</a></li>
                            </ul>
                        </li>
                        <li><a href="#">Contact</a></li>
                        <li>
                            <a href="#"><i className="fa-solid fa-magnifying-glass" /></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    );
}

export default Header;