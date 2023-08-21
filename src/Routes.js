import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";
import EditUser from "./components/EditUser";
import Home from "./Home";

function AppRoutes() {
    return(
        <Routes>
            <Route exact path="/login" element={<LoginForm />}/>
            <Route exact path="/signup" element={<SignupForm />}/>
            <Route exact path="/profile" element={<UserProfile />}/>        
            <Route exact path="/edituser" element={<EditUser />}/>
            <Route exact path="/" element={<Home />} />
            <Route element={<p>Hmmm. I can't seem to find what you want.</p>} />
        </Routes>
    )
}

export default AppRoutes;