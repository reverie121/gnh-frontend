import React from "react";
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import UserProfile from "./components/UserProfile";
import EditUser from "./components/EditUser";
import Home from "./Home";

function Routes() {
    return(
        <Switch>
            <Route exact path="/login">
                <LoginForm />
            </Route>
            <Route exact path="/signup">
                <SignupForm />
            </Route>
            <Route exact path="/profile">
                <UserProfile />
            </Route>            
            <Route exact path="/edituser">
                <EditUser />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
        </Switch>
    )
}

export default Routes;