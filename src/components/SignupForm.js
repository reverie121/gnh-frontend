import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";

import { userToLocal } from "../helpers/localStorageHelper";
import GameNightHelperAPI from "../api/gnh-api";
import ThemedButton from "./themed-components/ThemedButton";

function SignupForm() {
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password: "",
        bggUsername: "", 
        firstName: "",
        lastName: "",
        email: ""
    }

    // Sets State for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [ loading, setLoading ] = useState(false);

    // Makes request to backend to regiser a new user.
    const registerNewUser = async () => {
        // Create userData object for post request to backend.
        const userData = {username: formData.username, password: formData.password, bggUsername: formData.bggUsername, firstName: formData.firstName, lastName: formData.lastName, email: formData.email};
        // If successful, put username and auth token into localStorage.        
        try {
            let token = await GameNightHelperAPI.registerUser(userData);
            userToLocal(token, formData.username);
            setLoading(false);
        }
        catch(err) {
            console.error(err);
            setLoading(false);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Register the new user. ***
        await registerNewUser();
        // Clear form.
        setFormData(INITIAL_STATE);
        // Redirect to user dashboard.
        navigate("/dashboard")
    }        

    const inputStyles = {mt: 2};

    return(
        <>
            {loading === true && 
            <Stack alignItems="center">
                <CircularProgress color="secondary" sx={{marginTop: 2}} />
                <Typography variant="h6" color="primary" sx={{m: 1}}>One moment while I get that information from BoardGameGeek...</Typography>
            </Stack>
            }
            {loading === false && 
            <Stack sx={{alignItems: "center"}}>
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

                    <Typography sx={{mt: 2, fontWeight: "bold", color: "primary.main"}}>Make A New Game Night Helper Account</Typography>

                    <TextField fullWidth variant="outlined" label="Username" name="username" value={formData["username"]} onChange={handleChange} sx={inputStyles} />

                    <TextField fullWidth variant="outlined" label="Password" name="password" value={formData["password"]} onChange={handleChange} sx={inputStyles} type="password" />

                    <TextField fullWidth variant="outlined" label="First Name" name="firstName" value={formData["firstName"]} onChange={handleChange} sx={inputStyles} />

                    <TextField fullWidth variant="outlined" label="Last Name" name="lastName" value={formData["lastName"]} onChange={handleChange} sx={inputStyles} />

                    <TextField fullWidth variant="outlined" label="Email" name="email" value={formData["email"]} onChange={handleChange} sx={inputStyles} />

                    <TextField fullWidth variant="outlined" label="BGG Username" name="bggUsername" value={formData["bggUsername"]} onChange={handleChange} sx={inputStyles} />

                    <Box sx={{mt: 1}}>
                        <ThemedButton onClick={handleSubmit} text="Submit" />
                    </Box>

                </Box>
            </Stack>}
        </>
    );
};

export default SignupForm;