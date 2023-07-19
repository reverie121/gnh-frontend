import React from "react";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import { userFromLocal } from "./localStorageHelper";
import getUserData from "./getUserData";

const bouncer = (user, setUser) => {
    // Get token and username from local storage.
    const { token, username } = userFromLocal()

    // If required data is not in local storage, redirect to login page.
    if (!token || !username) {
        console.debug('Token and/or username not present in local storage. Redirecting to login page.')
        return <Redirect to='/login' />;
    }

    // If user data is not present in state get user data from backend.
    if (!user) {
        getUserData(username, setUser);
        return(
            <h1>Loading &hellip;</h1>
        )
    }

    // Otherwise, return false to indicate no action is required.
    return false
}

export default bouncer;