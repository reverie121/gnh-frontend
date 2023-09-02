import React, { useState, useContext } from "react";

import { Box, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";

import GameListContext from "../context/GameListContext";

import filterGames from "../helpers/filterGames";
import sortGames from "../helpers/sortGames";

import ThemedButton from "./themed-components/ThemedButton";

import '../css/FilterForm.css';
import '../css/SortingForm.css';

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

    const INITIAL_SELECTION_STATE = {
        primary: "",
        secondary: ""
    }

    const INITIAL_RADIO_STATE = {
        primarySortDirection: "",
        secondarySortDirection: ""
    }

    const primarySelectOptions = [
        { name: "primary", value: "rating", label: "Rating" },
        { name: "primary", value: "title", label: "Title" },
        { name: "primary", value: "weight", label: "Weight" }
    ]

    const secondarySelectOptions = [
        { name: "secondary", value: "rating", label: "Rating" },
        { name: "secondary", value: "title", label: "Title" },
        { name: "secondary", value: "weight", label: "Weight" }
    ]

    // Sets State for the form data and process message.
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [checkboxes, setCheckboxes] = useState(INITIAL_CHECKBOX_STATE);
    const [selections, setSelections] = useState(INITIAL_SELECTION_STATE);
    const [radios, setRadios] = useState(INITIAL_RADIO_STATE);

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

    // Handles value changes (for inputs).
    const handleSelect = (e) => {
        const { name, value } = e.target;
        setSelections(selections => ({
            ...selections,
            [name]: value
        }))
    }

    // Handles value changes for radio inputs.
    const handleRadio = (e) => {
        const { name, value } = e.target
        setRadios(radios => ({
            ...radios, 
            [name]: value
        }))
    }

    const handleFilter = (e) => {
        e.preventDefault();
        let results = filterGames(formData, checkboxes);
        results = sortGames(results, selections, radios);
        setGameList(results);
    }

    const getRandomGame = (e) => {
        e.preventDefault();
        const results = filterGames(formData, checkboxes);
        const randomGame = results[Math.floor(Math.random() * results.length)];
        setGameList([randomGame]);
    }

    const filterGroupingStyles = {
        p: 1,
        display: "flex",
        flexDirection: "column"
    }

    const inputStyles = {
        mt: 1
    }

    return(
        <Paper elevation={5} sx={{
            m: 1, 
            pb: 1, 
            border: "solid", 
            borderColor: "primary.main",
            borderRadius: "3px", 
            borderWidth: "2px",
        }}>
            <form className="FilterForm">
                {/* Filters Header */}
                <Box sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    textAlign: "center"
                }}>
                    <Typography>Filters</Typography>
                </Box>                
                <Box sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "column",
                        xl: "column"
                    }
                }}>
                    {/* Individual Filters */}
                    <Box sx={filterGroupingStyles}>
                        <TextField sx={inputStyles} variant="outlined" label="Title" name="gameTitle" value={formData["gameTitle"]} onChange={handleChange} />
                        <TextField sx={inputStyles} variant="outlined" label="Min. Rating" name="gameRating" value={formData["gameRating"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 1, max: 9 }}} />
                        <TextField sx={inputStyles} variant="outlined" label="Play Time (Minutes)" name="playTime" value={formData["playTime"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 5, step: 5 }}} />
                    </Box>
                    {/* Player Count Filter */}
                    <Box sx={filterGroupingStyles}>
                        <h4>Player Count</h4>
                        <div className="formField">
                            <TextField sx={inputStyles} variant="outlined" label="# of Players" name="playerCount" value={formData["playerCount"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 1 }}} />
                        </div>
                        <div className="checkboxContainer">
                                <div className="chekboxSubContainer">
                                    <input type="checkbox" name="playerCountOfficial" id="playerCountOfficial" value="playerCountOfficial" checked={checkboxes['playerCountOfficial']} onChange={handleCheckbox} />
                                </div>
                                <label htmlFor="playerCountOfficial">&nbsp;Publisher</label>
                        </div>
                        <div className="checkboxContainer">
                                <div className="chekboxSubContainer Best">
                                    <input type="checkbox" name="playerCountBest" id="playerCountBest" value="playerCountBest" checked={checkboxes['playerCountBest']} onChange={handleCheckbox} />  
                                </div>
                                <label htmlFor="playerCountBest">&nbsp;Best</label>
                        </div>
                        <div className="checkboxContainer">
                                <div className="chekboxSubContainer Recommended">
                                    <input type="checkbox" name="playerCountRecommended" id="playerCountRecommended" value="playerCountRecommended" checked={checkboxes['playerCountRecommended']} onChange={handleCheckbox} />
                                </div>
                                <label htmlFor="playerCountRecommended">&nbsp;Recommended</label>
                        </div>
                    </Box>
                    {/* Game Weight Filter */}
                    <Box sx={filterGroupingStyles}>
                        <h4>Game Weight</h4>
                        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
                            <div className="formField">
                                <TextField sx={inputStyles} variant="outlined" label="Min." name="minWeight" value={formData["minWeight"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 0, max: 5, step: 0.25 }}} />
                            </div>
                            <div className="formField">
                                <TextField sx={inputStyles} variant="outlined" label="Max." name="maxWeight" value={formData["maxWeight"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 0, max: 5, step: 0.25 }}} />
                            </div>
                        </Box>
                    </Box>
                    {/* Age Filter */}
                    <Box sx={filterGroupingStyles}>
                        <h4>Min. Age</h4>
                        <div className="formField">
                            <TextField sx={inputStyles} variant="outlined" label="Min. Age" name="minAge" value={formData["minAge"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 0 }}} />
                        </div>
                        <div className="checkboxContainer">
                                <div className="chekboxSubContainer">
                                    <input type="checkbox" name="publisherMinAge" id="publisherMinAge" value="publisherMinAge" checked={checkboxes['publisherMinAge']} onChange={handleCheckbox} />
                                </div>
                                <label htmlFor="publisherMinAge">&nbsp;Publisher</label>
                        </div>
                        <div className="checkboxContainer">
                                <div className="chekboxSubContainer">
                                    <input type="checkbox" name="communityMinAge" id="communityMinAge" value="communityMinAge" checked={checkboxes['communityMinAge']} onChange={handleCheckbox} />  
                                </div>
                                <label htmlFor="communityMinAge">&nbsp;Community</label>
                        </div>
                    </Box>
                </Box>

                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <h4>Sort By</h4>
                </Box>
                <div>
                    <Box className="sortingBox">
                        <Select 
                            fullWidth 
                            name="primary"
                            label="Primary Sort"
                            onChange={handleSelect} 
                            value={selections.primary}
                        >
                            {primarySelectOptions.map(o => 
                                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                            )}
                        </Select>
                        <Box className="sortingDirectionBox" onChange={handleRadio}>
                            <Box>
                                <input type="radio" value="primaryAscending" name="primarySortDirection" />
                                <label htmlFor="primaryAscending">Ascending</label>
                            </Box>
                            <Box>
                                <input type="radio" value="primaryDescending" name="primarySortDirection" />
                                <label htmlFor="primaryDescending">Descending</label>
                            </Box>
                        </Box>                    
                    </Box>
                </div>

                <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <h4>Then By</h4>
                </Box>
                <div>
                    <Box className="sortingBox">
                        <Select 
                            fullWidth 
                            name="secondary"
                            label="Secondary Sort"
                            onChange={handleSelect} 
                            value={selections.secondary}
                        >
                            {secondarySelectOptions.map(o => 
                                <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                            )}
                        </Select>
                        <Box  className="sortingDirectionBox" onChange={handleRadio}>
                            <Box>
                                <input type="radio" value="secondaryAscending" name="secondarySortDirection" />
                                <label htmlFor="secondaryAscending">Ascending</label>
                            </Box>
                            <Box>
                                <input type="radio" value="secondaryDescending" name="secondarySortDirection" />
                                <label htmlFor="secondaryDescending">Descending</label>
                            </Box>
                        </Box>   
                    </Box>
                </div>

                <div className="buttonContainer">
                    <ThemedButton onClick={handleFilter} text="Get&nbsp;Games" />
                    <ThemedButton onClick={getRandomGame} text="Randomize" />
                </div>

            </form>
        </Paper>
    );
};

export default FilterForm;