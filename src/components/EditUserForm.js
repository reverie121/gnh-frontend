import React, {useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import GameNightHelperAPI from "../api/gnh-api";
import UpdateProcessResponseMessage from "./UpdateProcessResponseMessage";

import '../css/EditUserForm.css';

function editUserForm( { username, firstName, lastName, email, setUser } ) {
    const history = useHistory();

    const INITIAL_STATE = {
        username: username,
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
        const userData = {username: formData.username, firstName: formData.firstName, lastName: formData.lastName, email: formData.email};
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
        history.push("./profile");
    }        

    return(
        <form>
            <h2>Profile</h2>
            <div className="field">
            <label htmlFor="username">Username</label>
            <input disabled
                id="username"
                type="text"
                name="username"
                value={formData["username"]}
                onChange={handleChange}
            />
            </div>
            <div className="field">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData["firstName"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData["lastName"]}
                    onChange={handleChange}
                />
            </div>
            <div className="field">
                <label htmlFor="email">email</label>
                <input
                    id="email"
                    type="text"
                    name="email"
                    value={formData["email"]}
                    onChange={handleChange}
                />
            </div>
            <UpdateProcessResponseMessage processIs={editProcess} />
            <button onClick={handleSubmit}>Submit</button>
        </form>
    );
};

export default editUserForm