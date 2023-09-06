import React, { useState, useContext } from "react";
import { FormControl } from "@mui/material";

import GetCollectionInput from "./GetCollectionInput";
import GameListContext from "../context/GameListContext";
import { gameListToLocal } from "../helpers/localStorageHelper";
import ProcessResponseMessage from "./ProcessResponseMessage";
import GameNightHelperAPI from "../api/gnh-api";
import ThemedButton from "./themed-components/ThemedButton";

function GetCollectionForm() {

    const { setGameList } = useContext(GameListContext);

    // const history = useHistory();
    const INITIAL_STATE = {
        username1: "",
    }

    // Sets state for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [editProcess, setEditProcess] = useState('idle');

    // Set state for number of collections to be queried. Will increase as additional username inputs are added by user.
    const [collectionCount, setCollectionCount] = useState(['1'])

    // Return detailed game data from a collection request.
    const handleQuery = async () => {
        try {
            const gameData = await GameNightHelperAPI.getBGGCollection(formData.username1);
            // Update state.
            setGameList(Object.values(gameData));
            gameListToLocal(Object.values(gameData));
            setEditProcess('success');
        } catch (err) {
            console.error(err);
            setEditProcess('failure');
        }
    }

    // Add another username input for additional collection request.
    const addCollectionInput = () => {
        setCollectionCount([...collectionCount, `${collectionCount.length + 1}`]);
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
        setEditProcess('pending')
        // Send GET request.
        await handleQuery();
        // Clear form.
        setFormData(INITIAL_STATE);
        // Redirect to.... ?

    }        

    return(
        <FormControl>
            {collectionCount.map(n => 
            <GetCollectionInput id={n} key={n} addCollectionInput={(id) => addCollectionInput(id)} handleChange={(e) => handleChange(e)} />
            )}
            <ProcessResponseMessage processIs={editProcess} />
            <ThemedButton onClick={handleSubmit} text="Get Games" />
        </FormControl>
    );
};

export default GetCollectionForm;