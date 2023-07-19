import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import { userClearLocal } from "./helpers/localStorageHelper";
import UserContext from "./context/UserContext";

import './css/Nav.css';

function Nav() {

    const { user, setUser } = useContext(UserContext)
    const { pathname } = useLocation();

    function isLoggedIn() {
        return user ? true : false
    }

    function logout() {
        userClearLocal();
        setUser(null);
    }

    return(
        <div id="Nav">
            <NavLink to="../" isActive={() => pathname === "/"}>Game Night Helper</NavLink>
            <div>
                {isLoggedIn() && <NavLink to="../profile">Profile</NavLink>}
                {isLoggedIn() && <NavLink to="../" onClick={logout} isActive={() => pathname === "/logout"}>Log Out {user.username}</NavLink>}
                {!isLoggedIn() && <NavLink to="../login">Log In</NavLink>}
                {!isLoggedIn() && <NavLink to="../signup">Sign Up</NavLink>}
            </div>
        </div>
    )
};

export default Nav;