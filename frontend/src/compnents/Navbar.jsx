import React, { useState } from 'react'
import Cookies from "js-cookie"
import { Link, useNavigate } from 'react-router'
import axios from 'axios';
import { Backendapi } from '../Api';
import { useEffect } from 'react';

function Navbar() {

    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function logouthandle() {
        axios.get(`${Backendapi}/users/logout`, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    navigate("/login")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleNavigation(path) {
        navigate(path);
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }


    return (
        <div className="navbar">
            <a href="/">Vlog Menia</a>
            <ul className={`nav-list ${isMenuOpen ? 'show' : ''}`}>
                <li>
                    <a href="/home" onClick={() => handleNavigation('/home')}>Home</a>
                </li>
                <li className="nav-dropdown">
                    <div className="title">select an option</div>
                    <ul className="nav-dropdown-menu">
                        <li><Link to="/create">Create new blog</Link></li>
                        <li><Link to="/myblog">My Blog</Link></li>
                        <li><Link to="/dashboard" onClick={() => navigate('/dashboard')}>Dashboard</Link></li>
                    </ul>
                </li>
                <li>
                    <a href="/about" onClick={() => handleNavigation('/about')}>About</a>
                </li>
                <li>
                    <a href="/contact" onClick={() => handleNavigation('/contact')}>Contact</a>
                </li>
                <li>
                    <button className='primary-btnclass' style={{ margin: '0px' }} onClick={logouthandle}>logout</button>
                </li>
            </ul>
            {!isMenuOpen ? <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
                : <i className="fa-solid fa-xmark" onClick={() => setIsMenuOpen(false)}></i>}
        </div>
    )
}

export default Navbar
