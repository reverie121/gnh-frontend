import React from "react";
import { Routes, Route } from "react-router-dom";

import CollectionBrowser from "./components/CollectionBrowers";
import Top100Games from "./components/Top100Games";
import Hot50Games from "./components/Hot50Games";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserDashboard from "./components/userDashboard";
import EditUser from "./components/EditUser";
import Home from "./Home";

function AppRoutes() {
    return(
        <Routes>
            <Route exact path="/login" element={<LoginForm />}/>
            <Route exact path="/signup" element={<SignupForm />}/>
            <Route exact path="/dashboard" element={<UserDashboard />}/>        
            <Route exact path="/collectionbrowser" element={<CollectionBrowser />}/>        
            <Route exact path="/top100" element={<Top100Games />}/>        
            <Route exact path="/hot50" element={<Hot50Games />}/>        
            <Route exact path="/edituser" element={<EditUser />}/>
            <Route exact path="/" element={<Home />} />
            <Route element={<p>Hmmm. I can't seem to find what you want.</p>} />
        </Routes>
    )
}

export default AppRoutes;