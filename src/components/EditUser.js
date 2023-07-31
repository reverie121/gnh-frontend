import React, { useContext } from "react";

import bouncer from "../helpers/bouncer";
import UserContext from "../context/UserContext";
import EditUserForm from "./EditUserForm";

import '../css/EditUser.css';

function EditUser() {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    return(
        <div className="EditUser">
            <EditUserForm username={user.username} bggUsername={user.bggUsername} firstName={user.firstName} lastName={user.lastName} email={user.email} setUser={(user) => setUser(user)}/>
        </div>
    )
};

export default EditUser;