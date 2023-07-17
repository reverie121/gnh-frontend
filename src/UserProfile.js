import React, { useContext } from "react";

import bouncer from "./helpers/bouncer";
import UserContext from "./UserContext";
import EditUserForm from "./EditUserForm";

import './css/UserProfile.css';

function UserProfile() {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    return(
        <div className="UserProfile">
            <EditUserForm username={user.username} firstName={user.firstName} lastName={user.lastName} email={user.email} setUser={(user) => setUser(user)}/>
        </div>
    )
};

export default UserProfile;