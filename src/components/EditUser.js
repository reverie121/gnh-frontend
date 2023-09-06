import React, { useContext } from "react";
import { Stack } from "@mui/material";

import bouncer from "../helpers/bouncer";
import UserContext from "../context/UserContext";
import EditUserForm from "./EditUserForm";

function EditUser() {
    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    return(
        <Stack sx={{alignItems: "center"}}>
            <EditUserForm username={user.username} bggUsername={user.bggUsername} firstName={user.firstName} lastName={user.lastName} email={user.email} setUser={(user) => setUser(user)}/>
        </Stack>
    )
};

export default EditUser;