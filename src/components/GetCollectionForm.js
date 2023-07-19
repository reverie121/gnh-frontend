import React, { useState, useContext } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// import GameNightHelperAPI from "../api/gnh-api";
import GameNightBGGHelperAPI from "../api/bgg-api";
// import ProcessResponseMessage from "./ProcessResponseMessage";
import GetCollectionInput from "./GetCollectionInput";
import GameListContext from "../context/GameListContext";
import { gameListToLocal } from "../helpers/localStorageHelper";

const convert = require("xml-js");

function GetCollectionForm() {

    const { setGameList } = useContext(GameListContext);

    // const history = useHistory();
    const INITIAL_STATE = {
        username1: "",
    }

    // Sets State for the form data.
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleQuery = async () => {
        let username = formData.username1;
        const res = await GameNightBGGHelperAPI.getCollection(username);
        const data = JSON.parse(
            convert.xml2json(res, { compact: true, spaces: 2 })
        );
        let idList = '';
        Object.values(data.items.item).map(g => idList = idList + `${g._attributes.objectid},`);
        const res2 = await GameNightBGGHelperAPI.getGame(idList.slice(0, -1));
        const data2 = JSON.parse(
            convert.xml2json(res2, { compact: true, spaces: 2 })
        );
        console.log(data2.items.item)
        setGameList(Object.values(data2.items.item));
        gameListToLocal(Object.values(data2.items.item));
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
        // Send GET request.
        await handleQuery();
        // Clear form.
        setFormData(INITIAL_STATE);
        // Redirect to user profile.

    }        

    return(
        <form className="GetCollectionForm">
            <GetCollectionInput id="1" handleChange={(e) => handleChange(e)} />       
            <button onClick={handleSubmit}>Get Games</button>
        </form>
    );
};

export default GetCollectionForm;