import React, { useState, useContext } from "react";

import GameListContext from "../context/GameListContext";

import { gameListFromLocal } from "../helpers/localStorageHelper";

import '../css/FilterForm.css';

function FilterForm() {
    const { setGameList } = useContext(GameListContext);

    const INITIAL_STATE = {
        gameRating: "",
        playerCount: "",
        minPlayTime: "",
        maxPlayTime: "",
        minWeight: "",
        maxWeight: ""
    }

    const INITIAL_CHECKBOX_STATE = {
        playerCountOfficial: false,
        playerCountBest: true,
        playerCountRecommended: true
    }

    // Sets State for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [checkboxes, setCheckboxes] = useState(INITIAL_CHECKBOX_STATE);

    // Handles value changes (for inputs).
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
                ...formData,
            [name]: value
        }))
    }

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;
        setCheckboxes(checkboxes => ({
            ...checkboxes,
        [name]: checked
    }))
    }

    const filterGames = () => {
        // Initialize list from local storage for filtering.
        let listToFilter = gameListFromLocal();
        // Filter by minimum rating, as required.
        if (formData.gameRating) listToFilter = listToFilter.filter(g => Number(g.statistics.ratings.average._attributes.value).toFixed(1) >= formData.gameRating);
        // Filter by player count, as required.
        if (formData.playerCount) {
            // Filter logic for official player count.
            if (checkboxes.playerCountOfficial === true) listToFilter = listToFilter.filter(g => Number(g.minplayers._attributes.value) <= formData.playerCount && formData.playerCount <= Number(g.maxplayers._attributes.value))
            // Filter logic for user-voted player count ratings.
            if (checkboxes.playerCountBest === true && checkboxes.playerCountRecommended === true) {
                listToFilter = listToFilter.filter(g => 
                    g.poll[0].results.length >= formData.playerCount 
                    && 
                    (Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                    >= 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes) 
                    ||  
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                    >= 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes)) 
                    && 
                    (Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) >= 1 
                    || 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) >= 1)
                )
            } 
            else if (checkboxes.playerCountBest === true) {
                listToFilter = listToFilter.filter(g => 
                    g.poll[0].results.length >= formData.playerCount 
                    && 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                    >= 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                    &&   
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                    >= 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes) 
                    && 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) >= 1 
                )
            }
            else if (checkboxes.playerCountRecommended === true) {
                listToFilter = listToFilter.filter(g => 
                    g.poll[0].results.length >= formData.playerCount 
                    && 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                    > 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[0]._attributes.numvotes) 
                    &&   
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) 
                    >= 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[2]._attributes.numvotes) 
                    && 
                    Number(g.poll[0].results[Number(formData.playerCount)-1].result[1]._attributes.numvotes) >= 1 
                )                
            }
        }
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
            <div className="filters">
                <div id="individualFiltersBox">
                    <div className="formField">
                        <label for="gameRating">Min. Avg. Game Rating </label>
                        <input name="gameRating" id="gameRating" type="number" min={0} value={formData["gameRating"]} onChange={handleChange} />
                    </div>
                </div>

                <div id="playerCountBox">
                    <h4><i className="fa-solid fa-question tooltip" /> Player Count</h4>
                    <div className="formField">
                            <label for="playerCount"># of Players </label>
                            <input name="playerCount" id="playerCount" type="number" min={1} value={formData["playerCount"]} onChange={handleChange} />
                    </div>
                    <div className="checkboxContainer">
                            <label htmlFor="playerCountOfficial">Publisher</label>
                            <div className="chekboxSubContainer">
                                <input type="checkbox" name="playerCountOfficial" id="playerCountOfficial" value="playerCountOfficial" checked={checkboxes['playerCountOfficial']} onChange={handleCheckbox} />
                            </div>
                    </div>
                    <div className="checkboxContainer">
                            <label htmlFor="playerCountBest">Best</label>
                            <div className="chekboxSubContainer Best">
                                <input type="checkbox" name="playerCountBest" id="playerCountBest" value="playerCountBest" checked={checkboxes['playerCountBest']} onChange={handleCheckbox} />  
                            </div>
                    </div>
                    <div className="checkboxContainer">
                            <label htmlFor="playerCountRecommended">Recommended</label>
                            <div className="chekboxSubContainer Recommended">
                                <input type="checkbox" name="playerCountRecommended" id="playerCountRecommended" value="playerCountRecommended" checked={checkboxes['playerCountRecommended']} onChange={handleCheckbox} />
                            </div>
                    </div>
                </div>

                <div id="playTimeBox">
                    <h4><i className="fa-solid fa-question tooltip" /> Play Time</h4>
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
                    <h4><i className="fa-solid fa-question tooltip" /> Game Weight</h4>
                    <div className="formField">
                        <label for="minWeight">Min. </label>
                        <input name="minWeight" id="minWeight" type="number" min={0} max={5} value={formData["minWeight"]} onChange={handleChange} />
                    </div>
                    <div className="formField">
                        <label for="maxWeight">Max. </label>
                        <input name="maxWeight" id="maxWeight" type="number" min={0} max={5} value={formData["maxWeight"]} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div id="buttonContainer">
                <button onClick={handleFilter}>Filter Games</button>
                <button onClick={bringTheLuck}>I'm Feeling Lucky!</button>
            </div>
        </form>
    );
};

export default FilterForm;