import React, { useState, useContext } from "react";

import GameNightBGGHelperAPI from "../api/bgg-api";
import GetCollectionInput from "./GetCollectionInput";
import GameListContext from "../context/GameListContext";
import { gameListToLocal } from "../helpers/localStorageHelper";
import ProcessResponseMessage from "./ProcessResponseMessage";

const convert = require("xml-js");

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
            let username = formData.username1;
            // Make request for collection data.
            const res = await GameNightBGGHelperAPI.getCollection(username);
            const data = JSON.parse(
                convert.xml2json(res, { compact: true, spaces: 2 })
            );
            // Get a set (no duplicates) of IDs from collection.
            const idSet = new Set(
                Object.values(data.items.item).map(g => g._attributes.objectid)
            );
            // Convert id set into a comma-separated string for request.
            const idList = [...idSet].join(",");
            // Make request for game details for all unique games in collection.
            const res2 = await GameNightBGGHelperAPI.getGame(idList);
            const data2 = JSON.parse(
                convert.xml2json(res2, { compact: true, spaces: 2 })
            );
            const gameData = data2.items.item
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
        <form className="GetCollectionForm">
            {collectionCount.map(n => 
            <GetCollectionInput id={n} key={n} addCollectionInput={(id) => addCollectionInput(id)} handleChange={(e) => handleChange(e)} />
            )}
            <ProcessResponseMessage processIs={editProcess} />
            <button onClick={handleSubmit}>Get Games</button>
        </form>
    );
};

export default GetCollectionForm;