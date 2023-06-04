import {useContext} from 'react';
import {NavLink, redirect} from "react-router-dom";
import {AuthContext} from "../context/AuthContext.jsx";

export const NavBar = () => {
    const auth =useContext(AuthContext)
    const logoutHandler = e =>{
        e.preventDefault()
        auth.logout()
        redirect('/')
    }

    return (
        <nav>
            <div className="nav-wrapper blue darken-1">
                <span className="brand-logo">ShortCut links</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Create</NavLink></li>
                    <li><NavLink to="/links">Links</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    );
}

