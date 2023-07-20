import React, { useState, useContext } from "react";

import GameListContext from "../context/GameListContext";

import { gameListFromLocal } from "../helpers/localStorageHelper";

import '../css/FilterForm.css';

function FilterForm() {
    const { gameList, setGameList } = useContext(GameListContext);

    const INITIAL_STATE = {
        playerCount: "",
        gameRating: "",
        minPlayTime: "",
        maxPlayTime: "",
        minWeight: "",
        maxWeight: ""
    }

    // Sets State for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);
    
    // Handles value changes (for inputs).
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const filterGames = () => {
        // Initialize list from local storage for filtering.
        let listToFilter = gameListFromLocal();
        // Filter by minimum rating, as required.
        if (formData.gameRating) listToFilter = listToFilter.filter(g => Number(g.statistics.ratings.average._attributes.value).toFixed(1) >= formData.gameRating);
        // Filter by minimum play time, as required.
        if (formData.minPlayTime) listToFilter = listToFilter.filter(g => Number(g.minplaytime._attributes.value) >= formData.minPlayTime);  
        // Filter by maximum play time, as required.
        if (formData.maxPlayTime) listToFilter = listToFilter.filter(g => Number(g.maxplaytime._attributes.value) <= formData.maxPlayTime);           
        // Filter by minimum weight, as required.
        if (formData.minWeight) listToFilter = listToFilter.filter(g => g.statistics.ratings.averageweight._attributes.value >= formData.minWeight);  
        // Filter by maximum weight, as required.
        if (formData.maxWeight) listToFilter = listToFilter.filter(g => g.statistics.ratings.averageweight._attributes.value <= formData.maxWeight);           
        // Return filtered list.
        return listToFilter;
    }

    const handleFilter = (e) => {
        e.preventDefault();
        const results = filterGames();
        setGameList(results);
    }

    const bringTheLuck = (e) => {
        e.preventDefault();
        const results = filterGames();
        const randomGame = results[Math.floor(Math.random() * results.length)];
        setGameList([randomGame]);
    }

    return(
        <form className="FilterForm">

            <div id="individualFiltersBox">
                <div className="formField">
                    <label for="playerCount">Number of Players </label>
                    <input disabled name="playerCount" id="playerCount" type="number" min={1} value={formData["playerCount"]} onChange={handleChange} />
                </div>
                <div className="formField">
                    <label for="gameRating">Min. Avg. Game Rating </label>
                    <input name="gameRating" id="gameRating" type="number" min={0} value={formData["gameRating"]} onChange={handleChange} />
                </div>
            </div>

            <div id="playingTimeBox">
                <h4><i class="fa-solid fa-question tooltip" /> Play Time</h4>
                <div className="formField">
                    <label for="minPlayTime">Min. </label>
                    <input name="minPlayTime" id="minPlayTime" type="number" min={0} value={formData["minPlayTime"]} onChange={handleChange} />
                </div>
                <div className="formField">
                    <label for="maxPlayTime">Max. </label>
                    <input name="maxPlayTime" id="maxPlayTime" type="number" min={0} value={formData["maxPlayTime"]} onChange={handleChange} />
                </div>
            </div>

            <div id="weightBox">
                <h4><i class="fa-solid fa-question tooltip" /> Game Weight</h4>
                <div className="formField">
                    <label for="minWeight">Min. </label>
                    <input name="minWeight" id="minWeight" type="number" min={0} max={5} value={formData["minWeight"]} onChange={handleChange} />
                </div>
                <div className="formField">
                    <label for="maxWeight">Max. </label>
                    <input name="maxWeight" id="maxWeight" type="number" min={0} max={5} value={formData["maxWeight"]} onChange={handleChange} />
                </div>
            </div>
            <button onClick={handleFilter}>Filter Games</button>
            <button onClick={bringTheLuck}>I'm Feeling Lucky!</button>
        </form>
    );
};

export default FilterForm;