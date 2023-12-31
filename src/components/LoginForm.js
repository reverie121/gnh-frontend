import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Stack, TextField, Typography } from "@mui/material";

import { userToLocal } from "../helpers/localStorageHelper";
import GameNightHelperAPI from "../api/gnh-api";
import ThemedButton from "./themed-components/ThemedButton";

function LoginForm() {

    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: "",
        password: ""
    }

    // Sets State for the form data.
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [ loading, setLoading ] = useState(false);

    // Makes login request and stores auth token and username in local storage.
    const handleLogin = async () => {
        try {
            const loginCredentials = {username: formData.username, password: formData.password};
            let token = await GameNightHelperAPI.loginUser(loginCredentials);
            userToLocal(token, formData.username);
            setLoading(false);
        }
        // If unsuccessful, reset form and indicate failure for process message.
        catch(err) {
            console.error(err);
            setFormData(INITIAL_STATE);
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
        // Log in user.
        await handleLogin();
        // Clear form.
        setFormData(INITIAL_STATE);
        // Redirect to user dashboard.
        navigate("/dashboard");
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
                    <Typography sx={{mt: 2, fontWeight: "bold", color: "primary.main"}}>Log In</Typography>

                    <TextField fullWidth variant="outlined" label="Username" name="username" value={formData["username"]} onChange={handleChange} sx={inputStyles} />

                    <TextField fullWidth variant="outlined" label="Password" name="password" value={formData["password"]} onChange={handleChange} sx={inputStyles} type="password" />

                    <Box sx={{mt: 1}}>
                        <ThemedButton onClick={handleSubmit} text="Submit" />
                    </Box>
                </Box>
            </Stack>}
        </>
    );
};

export default LoginForm;