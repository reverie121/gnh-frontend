import React, { useState, useContext } from "react";
import Select from "react-select";

import GameListContext from "../context/GameListContext";

import '../css/SortingForm.css';

function SortingForm() {
    const { gameList, setGameList } = useContext(GameListContext);

    const INITIAL_SELECTION_STATE = {
        primary: "",
        secondary: "",
        tertiary: ""
    }

    const INITIAL_RADIO_STATE = {
        primarySortDirection: "",
        secondarySortDirection: "",
        tertiarySortDirection: ""
    }

    const primarySelectOptions = [
        { sortID: "primary", value: "rating", label: "Rating" },
        { sortID: "primary", value: "title", label: "Title" },
        { sortID: "primary", value: "weight", label: "Weight" }
    ]

    const secondarySelectOptions = [
        { sortID: "secondary", value: "rating", label: "Rating" },
        { sortID: "secondary", value: "title", label: "Title" },
        { sortID: "secondary", value: "weight", label: "Weight" }
    ]

    const tertiarySelectOptions = [
        { sortID: "tertiary", value: "rating", label: "Rating" },
        { sortID: "tertiary", value: "title", label: "Title" },
        { sortID: "tertiary", value: "weight", label: "Weight" }
    ]

    // Sets State for the form data and process message.
    const [selections, setSelections] = useState(INITIAL_SELECTION_STATE);
    const [radios, setRadios] = useState(INITIAL_RADIO_STATE);

    // Sets styling for Select components.
    const selectStyles = {
        control: (styles) => ({...styles, minWidth: "100px"})
    }

    // Handles value changes (for inputs).
    const handleSelect = (option) => {
        const { sortID, value } = option;
        setSelections(selections => ({
            ...selections,
            [sortID]: value
        }))
    }

    // Handles value changes for radio inputs.
    const handleRadio = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setRadios(radios => ({
            ...radios, 
            [name]: value
        }))
    }

    const sortGames = () => {

        // Get gameList from state to use for sorting.
        let listToSort = gameList;

        // Collect sort parameters from state starting with the last set of parameters and ending with the first set. Sorting should be done, in this way, in reverse order.
        let parameters = []
        if (selections.tertiary && radios.tertiarySortDirection) parameters.push({selection: selections.tertiary, direction: radios.tertiarySortDirection});
        if (selections.secondary && radios.secondarySortDirection) parameters.push({selection: selections.secondary, direction: radios.secondarySortDirection});
        if (selections.primary && radios.primarySortDirection) parameters.push({selection: selections.primary, direction: radios.primarySortDirection});

        // If there are no valid (includes both parameter and direction) sort parameters, return original list.
        if (parameters.length < 1) return listToSort;

        // Helper function for sorting. Accepts game data for two games along with the value being sorted by and returns those values from the game data.
        function getSortValues(a, b, sortValue) {
            if (sortValue === "title") {
                const aValue = Array.isArray(a.name) ? a.name[0]._attributes.value : a.name._attributes.value
                const bValue = Array.isArray(b.name) ? b.name[0]._attributes.value : b.name._attributes.value   
                return { aValue, bValue }             
            }
            if (sortValue === "rating") {
                const aValue = a.statistics.ratings.average._attributes.value !== "0" ? Number(Number(a.statistics.ratings.average._attributes.value).toFixed(1)) : 0
                const bValue = b.statistics.ratings.average._attributes.value !== "0" ? Number(Number(b.statistics.ratings.average._attributes.value).toFixed(1)) : 0
                return { aValue, bValue }
            }
            if (sortValue === "weight") {
                const aValue = a.statistics.ratings.averageweight._attributes.value !== "0" ? Number(Number(a.statistics.ratings.averageweight._attributes.value).toFixed(2)) : 0
                const bValue = b.statistics.ratings.averageweight._attributes.value !== "0" ? Number(Number(b.statistics.ratings.averageweight._attributes.value).toFixed(2)) : 0
                return { aValue, bValue }
            }
        }

        // Recursive helper function to sort games from a list.
        function sortGamesHelper (currentParams, list) {

            let sortedList = [...list.sort((a,b) => {
                const { aValue, bValue } = getSortValues(a,b,currentParams.selection)

                // If values are numbers...
                if (typeof(aValue) === "number" && typeof(bValue) === "number") {
                    if (currentParams.direction.includes('Ascending')) return aValue-bValue;
                    return bValue-aValue
                }

                // If values are strings...
                else if (typeof(aValue) === "string" && typeof(bValue) === "string"){
                    if (currentParams.direction.includes('Ascending')) return aValue.localeCompare(bValue)
                    return bValue.localeCompare(aValue)    
                }

                // If values are neither numbers or strings or do not match in type, log an error.
                else {
                    console.error(a);
                    console.error(b);
                    return console.error("Unable to sort", aValue, " /", bValue);                    
                }

            })]

            // If there are additional sorting parameters remaining, remove the first (current) parameter and sort again using the next parameter.
            if (parameters.length > 1) {
                parameters.shift();
                sortGamesHelper(parameters[0], sortedList);
            } 

            return sortedList;
        }

        // Call recursive helper function to do sorting and return sorted list.
        let sortedList = sortGamesHelper(parameters[0], listToSort)
        return sortedList;
    }

    const handleSort = (e) => {
        e.preventDefault();
        const results = sortGames();
        setGameList(results);
    }

    // Not currently used.
    // const handleClearSort = (e) => {
    //     e.preventDefault();
    //     setSelections(INITIAL_SELECTION_STATE);
    //     setRadios(INITIAL_RADIO_STATE);
    // }

    return(
        <form className="SortingForm">
            <div id="sortingBoxContainer">
                <div className="sortingBox">
                    <Select inputID="primarySort" options={primarySelectOptions} onChange={handleSelect} styles={selectStyles} />
                    <div  className="sortingDirectionBox" onChange={handleRadio}>
                        <div>
                            <input type="radio" value="primaryAscending" name="primarySortDirection" />
                            <label htmlFor="primaryAscending">Ascending</label>
                        </div>
                        <div>
                            <input type="radio" value="primaryDescending" name="primarySortDirection" />
                            <label htmlFor="primaryDescending">Descending</label>
                        </div>
                    </div>                    
                </div>
                <div className="sortingBox">
                    <Select options={secondarySelectOptions} onChange={handleSelect} styles={selectStyles} />
                    <div  className="sortingDirectionBox" onChange={handleRadio}>
                        <div>
                            <input type="radio" value="secondaryAscending" name="secondarySortDirection" />
                            <label htmlFor="secondaryAscending">Ascending</label>
                        </div>
                        <div>
                            <input type="radio" value="secondaryDescending" name="secondarySortDirection" />
                            <label htmlFor="secondaryDescending">Descending</label>
                        </div>
                    </div>                               
                </div>
                <div className="sortingBox">
                    <Select options={tertiarySelectOptions} onChange={handleSelect} styles={selectStyles} />
                    <div  className="sortingDirectionBox" onChange={handleRadio}>
                        <div>
                            <input type="radio" value="tertiaryAscending" name="tertiarySortDirection" />
                            <label htmlFor="tertiaryAscending">Ascending</label>
                        </div>
                        <div>
                            <input type="radio" value="tertiaryDescending" name="tertiarySortDirection" />
                            <label htmlFor="tertiaryDescending">Descending</label>
                        </div>
                    </div>                                
                </div>   
            </div>
            <div className="buttonContainer">
                <button onClick={handleSort}>Sort Games</button>
                {/* <button onClick={handleClearSort}>Clear Sorting</button> */}
            </div>
        </form>
    );
};

export default SortingForm;