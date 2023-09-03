import React, { useState, useContext } from "react";

import { Box, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from "@mui/material";
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

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
        primaryDirection: "ascending", 
        secondary: "", 
        secondaryDirection: "ascending"
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

    // Handles value changes (for inputs).
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
                ...formData,
            [name]: value
        }))
    }

    // Handles checkbox checks/unchecks.
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

    // Handles direction button clicks for sorting.
    const handleDirectionButton = (order, direction) => {
        setSelections(selections => ({
            ...selections,
            [`${order}Direction`]: direction
        }))
    }

    const handleFilter = (e) => {
        e.preventDefault();
        let results = filterGames(formData, checkboxes);
        results = sortGames(results, selections);
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
                        <h4>
                            <Tooltip arrow title="Filter player count by publisher specification and/or player poll results.">
                                <HelpOutlineIcon />
                            </Tooltip>
                            Player Count
                        </h4>
                        <div>
                            <TextField sx={{mt: 1, width: "100%"}} variant="outlined" label="# of Players" name="playerCount" value={formData["playerCount"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 1 }}} />
                        </div>
                        {formData.playerCount && 
                        <div>
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
                        </div>
                        }
                    </Box>

                    {/* Game Weight Filter */}
                    <Box sx={filterGroupingStyles}>
                        <h4>
                            <Tooltip arrow title={
                                <>
                                <div>Game Weight is determined by player poll results.</div>
                                <div>1: Light</div>
                                <div>2: Medium Light</div>
                                <div>3: Medium</div>
                                <div>4: Medium Heavy</div>
                                <div>5: Heavy</div>
                                </>
                            }>
                                <HelpOutlineIcon />
                            </Tooltip>                        
                            Game Weight
                        </h4>
                        <Box sx={{display: "flex", justifyContent: "space-evenly"}}>
                            <div>
                                <TextField sx={inputStyles} variant="outlined" label="Min." name="minWeight" value={formData["minWeight"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 0, max: 5, step: 0.25 }}} />
                            </div>
                            <div>
                                <TextField sx={inputStyles} variant="outlined" label="Max." name="maxWeight" value={formData["maxWeight"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 0, max: 5, step: 0.25 }}} />
                            </div>
                        </Box>
                    </Box>

                    {/* Age Filter */}
                    <Box sx={filterGroupingStyles}>
                        <h4>
                            <Tooltip arrow title="Filter min. age by publisher specification and/or player poll results.">
                                    <HelpOutlineIcon />
                            </Tooltip>                        
                            Min. Age
                        </h4>
                        <div>
                            <TextField sx={{mt: 1, width: "100%"}} variant="outlined" label="Min. Age" name="minAge" value={formData["minAge"]} onChange={handleChange} type="number" InputProps={{inputProps: { min: 0 }}} />
                        </div>
                        {formData.minAge && 
                        <div>
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
                        </div>
                        }
                    </Box>
                </Box>

                {/* Sorting Header */}
                <Box sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    textAlign: "center"
                }}>
                    <Typography>Sorting</Typography>
                </Box>        

                {/* Primary Sort */}
                <Box sx={{mt: 1}}>
                    <Box sx={{ml: 1, mr: 1, display: "flex"}}>
                        <FormControl fullWidth>
                            <InputLabel id="primarySort">Sort By</InputLabel>
                            <Select
                                name="primary"
                                labelId="primarySort"
                                id="primarySort"
                                value={selections.primary}
                                label="Sort By"
                                onChange={handleSelect}
                                >
                                {primarySelectOptions.map(o => 
                                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        {selections.primaryDirection === "ascending" && 
                        <IconButton color="primary" onClick={() => handleDirectionButton("primary", "descending")}>
                            <NorthRoundedIcon />
                        </IconButton>
                        }
                        {selections.primaryDirection === "descending" && 
                        <IconButton color="primary" onClick={() => handleDirectionButton("primary", "ascending")}>
                            <SouthRoundedIcon />
                        </IconButton>
                        }             
                    </Box>
                </Box>

                {/* Secondary Sort */}
                {selections.primary && 
                <Box sx={{mt: 1}}>
                    <Box sx={{ml: 1, mr: 1, display: "flex"}}>
                        <FormControl fullWidth>
                            <InputLabel id="secondarySort">Then By</InputLabel>
                            <Select
                                name="secondary"
                                labelId="secondarySort"
                                id="secondarySort"
                                value={selections.secondary}
                                label="Then By"
                                onChange={handleSelect}
                                >
                                {secondarySelectOptions.map(o => 
                                    <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        {selections.secondaryDirection === "ascending" && 
                        <IconButton color="primary" onClick={() => handleDirectionButton("secondary", "descending")}>
                            <NorthRoundedIcon />
                        </IconButton>
                        }
                        {selections.secondaryDirection === "descending" && 
                        <IconButton color="primary" onClick={() => handleDirectionButton("secondary", "ascending")}>
                            <SouthRoundedIcon />
                        </IconButton>
                        }
                    </Box>
                </Box>
                }

                {/* (Empty) Buttons Header */}
                <Box sx={{
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    textAlign: "center",
                    mt: 1
                }}>
                    <Typography>&nbsp;</Typography>
                </Box>   

                {/* Buttons for returning a game list or a random game. */}
                <Box sx={{mt: 1, display: "flex", flexDirection: "row", alignContent: "space-evenly", justifyContent: "center"}}>
                    <ThemedButton onClick={handleFilter} text="Get&nbsp;Games" />
                    <ThemedButton onClick={getRandomGame} text="Randomize" />
                </Box>

            </form>
        </Paper>
    );
};

export default FilterForm;