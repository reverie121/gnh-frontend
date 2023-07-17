import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { toLocal } from "./helpers/localStorageHelper";
import GameNightHelperAPI from "./api/gnh-api";
import './css/SignupForm.css';

function SignupForm() {
    const history = useHistory();
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

    // Sets State for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);

    // Makes request to backend to regiser a new user.
    const registerNewUser = async () => {
        // Create userData object for post request to backend.
        const userData = {username: formData.username, password: formData.password, firstName: formData.firstName, lastName: formData.lastName, email: formData.email};
        // If successful, put username and auth token into localStorage.        
        try {
            let token = await GameNightHelperAPI.registerUser(userData);
            toLocal(token, formData.username);
        }
        catch(err) {
            console.error(err);
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
        // Register the new user. ***
        await registerNewUser();
        // Clear form.
        setFormData(INITIAL_STATE);
        // Redirect to user profile.
        history.push("./profile");
    }        

    return(
        <form className="SignupForm">
            <div className="field">
                <label htmlFor="username"></label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData["username"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="password"></label>
                <input
                    id="password"
                    type="text"
                    name="password"
                    placeholder="Password"
                    value={formData["password"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="firstName"></label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData["firstName"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="lastName"></label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData["lastName"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="email"></label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="email"
                    value={formData["email"]}
                    onChange={handleChange}
                />
            </div>                                                
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default SignupForm;