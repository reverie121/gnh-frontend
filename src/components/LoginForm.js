import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, Stack, TextField, Typography } from "@mui/material";

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

    // Makes login request and stores auth token and username in local storage.
    const handleLogin = async () => {
        const loginCredentials = {username: formData.username, password: formData.password};
        let token = await GameNightHelperAPI.loginUser(loginCredentials);
        userToLocal(token, formData.username);
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
        // Log in user.
        await handleLogin();
        // Clear form.
        setFormData(INITIAL_STATE);
        // Redirect to user profile.
        navigate("/profile");
    }        

    const inputStyles = {mt: 2};

    return(
        <Stack sx={{alignItems: "center"}}>
            <FormControl>
                <Box sx={{
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
            </FormControl>        
        </Stack>
    );
};

export default LoginForm;