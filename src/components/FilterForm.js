import React, { useState, useContext } from "react";

import GameListContext from "../context/GameListContext";

import { gameListFromLocal } from "../helpers/localStorageHelper";
import { computePlayerAge } from "../helpers/gameData";

import '../css/FilterForm.css';

function FilterForm() {
    const { setGameList } = useContext(GameListContext);

    const INITIAL_STATE = {
        gameTitle: "",
        gameRating: "",
        playTime: "",
        playerCount: "",
        minWeight: "",
        maxWeight: "",
        minAge: ""
    }

    const INITIAL_CHECKBOX_STATE = {
        playerCountOfficial: false,
        playerCountBest: true,
        playerCountRecommended: true,
        publisherMinAge: true,
        communityMinAge: false
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
        // Filter by title, as required.
        if (formData.gameTitle) {
            listToFilter = listToFilter.filter(g => 
                Array.isArray(g.name) ? 
                g.name[0]._attributes.value.toLowerCase().includes(formData.gameTitle.toLowerCase())
                : 
                g.name._attributes.value.toLowerCase().includes(formData.gameTitle.toLowerCase())
            );
        };
        // Filter by minimum rating, as required.
        if (formData.gameRating) listToFilter = listToFilter.filter(g => Number(g.statistics.ratings.average._attributes.value).toFixed(1) >= formData.gameRating);
        // Filter by play time, as required.
        if (formData.playTime) listToFilter = listToFilter.filter(
                g => 
                Number(g.minplaytime._attributes.value) <= formData.playTime 
                && 
                Number(g.maxplaytime._attributes.value) >= formData.playTime
            );          
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
        // Filter by minimum weight, as required.
        if (formData.minWeight) listToFilter = listToFilter.filter(g => g.statistics.ratings.averageweight._attributes.value >= formData.minWeight);  
        // Filter by maximum weight, as required.
        if (formData.maxWeight) listToFilter = listToFilter.filter(g => g.statistics.ratings.averageweight._attributes.value <= formData.maxWeight);           
        // Filter by minimum age, as required.
        if (formData.minAge) {
            // Filter logic for official minimum age.
            if (checkboxes.publisherMinAge === true) listToFilter = listToFilter.filter(g => g.minage._attributes.value !== "0" && Number(g.minage._attributes.value) <= formData.minAge);     
            // Filter logic for community voted minimum age.
            if (checkboxes.communityMinAge === true) listToFilter = listToFilter.filter(g => g.poll[1]._attributes.totalvotes !== "0" && Number(computePlayerAge(g)) <= formData.minAge);
        }

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
                        <label htmlFor="gameTitle">Title </label>
                        <input name="gameTitle" id="gameTitle" type="text" value={formData["gameTitle"]} onChange={handleChange} />
                    </div>
                    <div className="formField">
                        <label htmlFor="gameRating">Min. (Avg.) Rating </label>
                        <input name="gameRating" id="gameRating" type="number" min={0} value={formData["gameRating"]} onChange={handleChange} />
                    </div>
                    <div className="formField">
                        <label htmlFor="playTime">Play Time (Minutes) </label>
                        <input name="playTime" id="playTime" type="number" min={0} value={formData["playTime"]} onChange={handleChange} />
                    </div>
                </div>

                <div id="playerCountBox">
                    <h4><i className="fa-solid fa-question tooltip" /> Player Count</h4>
                    <div className="formField">
                            <label htmlFor="playerCount"># of Players </label>
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
                <div id="weightBox">
                    <h4><i className="fa-solid fa-question tooltip" /> Game Weight</h4>
                    <div className="formField">
                        <label htmlFor="minWeight">Min. </label>
                        <input name="minWeight" id="minWeight" type="number" min={0} max={5} value={formData["minWeight"]} onChange={handleChange} />
                    </div>
                    <div className="formField">
                        <label htmlFor="maxWeight">Max. </label>
                        <input name="maxWeight" id="maxWeight" type="number" min={0} max={5} value={formData["maxWeight"]} onChange={handleChange} />
                    </div>
                </div>
                <div id="ageBox">
                    <h4><i className="fa-solid fa-question tooltip" /> Min. Age</h4>
                    <div className="formField">
                        <label htmlFor="minAge"></label>
                        <input name="minAge" id="minAge" type="number" min={1} value={formData["minAge"]} onChange={handleChange} />
                    </div>
                    <div className="checkboxContainer">
                            <label htmlFor="publisherMinAge">Publisher</label>
                            <div className="chekboxSubContainer">
                                <input type="checkbox" name="publisherMinAge" id="publisherMinAge" value="publisherMinAge" checked={checkboxes['publisherMinAge']} onChange={handleCheckbox} />
                            </div>
                    </div>
                    <div className="checkboxContainer">
                            <label htmlFor="communityMinAge">Community</label>
                            <div className="chekboxSubContainer">
                                <input type="checkbox" name="communityMinAge" id="communityMinAge" value="communityMinAge" checked={checkboxes['communityMinAge']} onChange={handleCheckbox} />  
                            </div>
                    </div>

                </div>
            </div>
            <div className="buttonContainer">
                <button onClick={handleFilter}>Filter Games</button>
                <button onClick={bringTheLuck}>I'm Feeling Lucky!</button>
            </div>
        </form>
    );
};

export default FilterForm;