import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { userToLocal } from "../helpers/localStorageHelper";
import GameNightHelperAPI from "../api/gnh-api";

import '../css/LoginForm.css';

function LoginForm() {

    const history = useHistory();
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
        history.push("./profile");
    }        

    return(
        <form className="LoginForm">
            <div className="field">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData["username"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData["password"]}
                    onChange={handleChange}
                />
            </div>                                         
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default LoginForm;