import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { userClearLocal } from "./helpers/localStorageHelper";
import UserContext from "./context/UserContext";

import './css/Nav.css';

function Nav() {

    const { user, setUser } = useContext(UserContext)
    const { pathname } = useLocation();

    const [hamburger, setHamburger] = useState("fa-solid fa-bars");
    const [navClass, setNavClass] = useState("");

    function changeIcon() {
        // hamburger === "fa-solid fa-bars" ? setHamburger("fa-solid fa-times") : setHamburger("fa-solid fa-bars");
        if (hamburger === "fa-solid fa-bars") {
            setHamburger("fa-solid fa-times");
            setNavClass("active");
        } else {
            setHamburger("fa-solid fa-bars");
            setNavClass("");
        }
    }

    function isLoggedIn() {
        return user ? true : false
    }

    function logout() {
        userClearLocal();
        setUser(null);
    }

    return(
        <nav id="Nav">
            <NavLink to="../" isActive={() => pathname === "/"}>Game Night Helper</NavLink>
            <div id="UserNav" className={navClass}>
                {isLoggedIn() && <NavLink to="../profile">User Profile</NavLink>}
                {isLoggedIn() && <NavLink to="../edituser">Edit User</NavLink>}
                {isLoggedIn() && <NavLink to="../" onClick={logout} isActive={() => pathname === "/logout"}>Log Out {user.username}</NavLink>}
                {!isLoggedIn() && <NavLink to="../login">Log In</NavLink>}
                {!isLoggedIn() && <NavLink to="../signup">Sign Up</NavLink>}
            </div>
            <i id="hamburger" className={hamburger} onClick={changeIcon}></i>
        </nav>
    )
};

export default Nav;