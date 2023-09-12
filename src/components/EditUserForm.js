import React, {useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Typography } from "@mui/material";

import ThemedButton from "./themed-components/ThemedButton";
import GameNightHelperAPI from "../api/gnh-api";
import UpdateProcessResponseMessage from "./UpdateProcessResponseMessage";

function EditUserForm( { username, bggUsername, firstName, lastName, email, setUser } ) {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: username,
        bggUsername: bggUsername !== null ? bggUsername : "", 
        firstName: firstName,
        lastName: lastName,
        email: email
    }

    // Sets State for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [editProcess, setEditProcess] = useState('idle');

    // Makes request to backend to edit user data.
    const editUserData = async () => {
        // Create userData object for patch request to backend.
        const userData = {username: formData.username, bggUsername: formData.bggUsername, firstName: formData.firstName, lastName: formData.lastName, email: formData.email};
        // If successful, update form values and indicate success for process message.
        try {
            let res = await GameNightHelperAPI.editUser(userData);
            setFormData(res);
            setUser(res)
            setEditProcess('success');
        }
        // If unsuccessful, reset form and indicate failure for process message.
        catch(err) {
            console.error(err);
            setEditProcess('failure');
            setFormData(INITIAL_STATE);
        }
    }

    // Handles value changes (for inputs).
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    // Handles form submition.
    const handleSubmit = (e) => {
        e.preventDefault();
        setEditProcess('pending')
        // Edits user data and updates form state. ***
        editUserData();
        // Redirect to user profile.
        navigate("/profile");
    }        

    const inputStyles = {mt: 2};

    return(
        <Box component="form" 
        sx={{
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
            width: {
                xs: "80vw", 
                sm: "70vw", 
                md: "50vw", 
                lg: "40vw", 
                xl: "30vw"
            }, 
            maxWidth: "500px", 
            m: 2, 
            pt: 1,
            pb: 1, 
            pl: 2, 
            pr: 2,  
            border: "solid", 
            borderColor: "primary.main",
            borderRadius: "3px", 
            borderWidth: "2px",   
        }}>

            <Typography sx={{mt: 2, fontWeight: "bold", color: "primary.main"}}>Edit User Data</Typography>

            <TextField fullWidth variant="outlined" label="Username" name="username" value={formData["username"]} onChange={handleChange} sx={inputStyles} />

            <TextField fullWidth variant="outlined" label="First Name" name="firstName" value={formData["firstName"]} onChange={handleChange} sx={inputStyles} />

            <TextField fullWidth variant="outlined" label="Last Name" name="lastName" value={formData["lastName"]} onChange={handleChange} sx={inputStyles} />

            <TextField fullWidth variant="outlined" label="Email" name="email" value={formData["email"]} onChange={handleChange} sx={inputStyles} />

            <TextField fullWidth variant="outlined" label="BGG Username" name="bggUsername" value={formData["bggUsername"]} onChange={handleChange} sx={inputStyles} />

            <UpdateProcessResponseMessage processIs={editProcess} />
            <Box sx={{mt: 1}}>
                <ThemedButton onClick={handleSubmit} text="Submit" />
            </Box>

        </Box>
    );
};

export default EditUserForm