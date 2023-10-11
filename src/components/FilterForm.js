/*** Component to provide the user with filtering and sorting for a list of games. ***/

import React, { useState, useEffect } from "react";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import FilterFormHelper from "../helpers/filterFormHelper";
import filterGames from "../helpers/filterGames";
import sortGames from "../helpers/sortGames";
import ThemedButton from "./themed-components/ThemedButton";
import ThemedTooltip from "./themed-components/ThemedTooltip";
import QuickFilters from "./QuickFilters";

function FilterForm({ games, setGamesToDisplay }) {

    // *** INITIAL VALUES FOR STATE ***

    const INITIAL_TEXTFIELD_STATE = {
        gameTitle: "",
        gameRating: "",
        playerCount: "",
        minPlayTime: "",
        maxPlayTime: "",
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

    // *** STATE & CONTEXT ***

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [formData, setFormData] = useState(INITIAL_TEXTFIELD_STATE);
    const [checkboxes, setCheckboxes] = useState(INITIAL_CHECKBOX_STATE);
    const [selections, setSelections] = useState(INITIAL_SELECTION_STATE);

    const [filtersExpanded, setFiltersExpanded] = useState(false);

    // *** USER INPUT HANDLERS ***
    // Updates state in response to user input.

    // Handles filter expander to hide/show filters and sorting.
    const handleFilterVisibilityChange = (e) => {
        setFiltersExpanded(!filtersExpanded);
    }

    // Handles value changes for TextFields.
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

    // Handles value changes for Selects.
    const handleSelect = (e) => {
        const { name, value } = e.target;
        setSelections(selections => ({
            ...selections,
            [name]: value
        }))
    }

    // Handles removing the primary sort.
    const handleRemoveSort = (e) => {
        // If there is a secondary sort, use those values for the primary sort.
        if (selections["secondary"] !== "") {
            // Get secondary sort values.
            const sortBy = selections["secondary"];
            const sortDir = selections["secondaryDirection"];
            // Set primary sort to secondary sort values.
            handleSelect({target: {name: "primary", value: sortBy}});
            handleDirectionButton("primary", sortDir);
            // Set secondary sort values to initial state.
            handleSelect({target: {name: "secondary", value: INITIAL_SELECTION_STATE["secondary"]}});
            handleDirectionButton("primary", INITIAL_SELECTION_STATE["secondaryDirection"]);
        } 
        // Otherwise, just re-set selections to initial state.
        else {
            setSelections(INITIAL_SELECTION_STATE);
        }
    }

    // Handles direction button clicks for sorting.
    const handleDirectionButton = (order, direction) => {
        setSelections(selections => ({
            ...selections,
            [`${order}Direction`]: direction
        }))
    }

    // Handles clicking the "Get Games" button.
    const handleFilter = (e) => {
        e.preventDefault();
        let results = filterGames(games, formData, checkboxes);
        results = sortGames(results, selections);
        setGamesToDisplay(results);
    }

    // Handles clickig the "Randomize" button.
    const getRandomGame = (e) => {
        e.preventDefault();
        const results = filterGames(games, formData, checkboxes);
        const randomGame = results[Math.floor(Math.random() * results.length)];
        setGamesToDisplay([randomGame]);
    }

    // *** SELECTION OPTIONS FOR SORTING ***

    const primarySelectOptions = [
        { name: "primary", value: "rating", label: "Rating" },
        { name: "primary", value: "title", label: "Title" },
        { name: "primary", value: "weight", label: "Weight" }
    ];

    // Secondary selection options should not inclue the primary selected value.
    const secondarySelectOptions = [
        { name: "secondary", value: "rating", label: "Rating" },
        { name: "secondary", value: "title", label: "Title" },
        { name: "secondary", value: "weight", label: "Weight" }
    ].filter(s => s.value !== selections.primary);

    // *** STYLES ***

    const checkBoxStyles = {
        "& > *": {
            mt: {
                xs: 1,
                sm: 0.5,
                md: 0.5,
                lg: 1,
                xl: 1
            },
            pt: 0, 
            pb: 0
        }
    }

    const checkBoxesContainerStyles = {
        display: "flex",
        flexDirection: {
            xs: "row", 
            sm: "column", 
            md: "column", 
            lg: "row", 
            xl: "row"
        },
        justifyContent: {
            xs: "space-evenly", 
            sm: "flex-start", 
            md: "flex-start", 
            lg: "space-evenly", 
            xl: "space-evenly"
        },
        alignItems: "flex-start"        
    }

    const filterGroupingStyles = {
        p: 1,
        display: "flex",
        flexDirection: "column"
    };

    const filterHeaderStyles = {
        mt: 1,
        mb: 1,
        fontWeight: "bold", 
        alignSelf: "center",
        color: "primary.main"
    };
    
    // Hook to add a listener that updates State with the window width on window resize.
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);
    
        return () => {
        window.removeEventListener('resize', handleWindowResize);
        };
    });

    // Filters should default to visible for lg+ size screens. Otherwise, default to hidden. Triggers on window resize.
    useEffect(() => {
        windowWidth >= 1200 ? setFiltersExpanded(true) : setFiltersExpanded(false)
    }, [windowWidth])

    return(
        <Paper elevation={5} sx={{
            m: 1, 
            pb: 1, 
            border: "solid", 
            borderColor: "primary.main",
            borderRadius: "3px", 
            borderWidth: "2px",
            minWidth: {sm: "350px"}
        }}>
            <FormGroup>
                {/* Filters Header */}
                <Stack direction="row" sx={{
                    justifyContent: "space-between", 
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                }}>
                    <KeyboardArrowUpRoundedIcon sx={{visibility: "hidden"}} />
                    <Typography>Filters</Typography>
                    {filtersExpanded && 
                        <KeyboardArrowUpRoundedIcon onClick={handleFilterVisibilityChange} sx={{visibility: {
                            xs: "visible",
                            lg: "hidden", 
                        }}} />}
                    {!filtersExpanded &&
                        <KeyboardArrowDownRoundedIcon onClick={handleFilterVisibilityChange} sx={{visbility: {
                            xs: "visible",
                            lg: "hidden", 
                        }}} />}
                </Stack>
                <Box sx={{
                    height: filtersExpanded ? "" : "0px",
                    visibility: filtersExpanded ? "visible" : "hidden",
                }}>


                <Stack justifyContent="space-evenly" direction={{
                        xs: "column",
                        sm: "row",
                        md: "row",
                        lg: "column",
                        xl: "column"}}>
                    {/* Individual Filters */}
                    <Box sx={filterGroupingStyles}>
                        
                        <TextField sx={{mt: 1}} variant="outlined" label="Title" name="gameTitle" value={formData["gameTitle"]} onChange={handleChange} />
                        
                        <TextField sx={{mt: 1}} variant="outlined" label="Min. Rating" name="gameRating" value={formData["gameRating"]} onChange={(e) => FilterFormHelper.gameRatingInput(e, handleChange)} type="number" InputProps={{inputProps: { min: 1, max: 9 }}} />
                        
                    </Box>

                        {/* Player Count Filter */}
                        <Box sx={filterGroupingStyles}>
                            {/* Player Count Header */}
                            <Typography sx={filterHeaderStyles}>
                                Player Count
                                <ThemedTooltip contents="Filter by player count according to publisher specification and/or player poll results."/>
                            </Typography>
                            {/* Player Count Input Field */}
                            <TextField sx={{mt: 1, width: "100%"}} variant="outlined" label="# of Players" name="playerCount" value={formData["playerCount"]} onChange={(e) => FilterFormHelper.playerCountInput(e, handleChange)} type="number" InputProps={{inputProps: { min: 1, max: 20 }}} />
                            {/* Player Count Checkboxes */}
                            {formData.playerCount && 
                            <Box sx={checkBoxesContainerStyles}>
                                <FormControlLabel control={
                                    <Checkbox 
                                        color="success" 
                                        size="small" 
                                        name="playerCountOfficial" value="playerCountOfficial"
                                        checked={checkboxes['playerCountOfficial']} onChange={handleCheckbox}
                                    />
                                    }
                                    label={
                                    <Typography fontSize="small">
                                        Publisher
                                    </Typography>
                                    } 
                                    sx={checkBoxStyles}
                                />
                                <FormControlLabel control={
                                    <Checkbox 
                                        color="success" 
                                        size="small" 
                                        name="playerCountBest" value="playerCountBest"
                                        checked={checkboxes['playerCountBest']} onChange={handleCheckbox}
                                    />
                                    }
                                    label={
                                    <Typography fontSize="small">
                                        Best
                                    </Typography>
                                    }
                                    sx={checkBoxStyles}
                                />
                                <FormControlLabel control={
                                    <Checkbox 
                                        color="success" 
                                        size="small" 
                                        name="playerCountRecommended" value="playerCountRecommended"
                                        checked={checkboxes['playerCountRecommended']} 
                                        onChange={handleCheckbox}
                                    />
                                    }
                                    label={
                                    <Typography fontSize="small">
                                        Recommended
                                    </Typography>
                                    } 
                                    sx={checkBoxStyles}
                                />                            
                            </Box>
                            }
                        </Box>




                        {/* Play Time Filter */}
                        <Box sx={filterGroupingStyles}>
                            {/* Play Time Header */}
                            <Typography sx={filterHeaderStyles}>
                                Play Time
                                <ThemedTooltip contents="Filter by estimated play time (in minutes)." />                    
                            </Typography>
                            {/* Container for Min and Max Inputs */}
                            <Box sx={{
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center", 
                                flexDirection: {
                                    xs: "row",
                                    sm: "column",
                                    md: "column",
                                    lg: "row",
                                    xl: "row"
                                }
                            }}>
                                {/* Play Time Min Input Field */}
                                <TextField sx={{
                                    mt: 1,
                                    width: {
                                        xs: "calc(50% - 4px)", 
                                        sm: "100%", 
                                        md: "100%", 
                                        lg: "calc(50% - 4px)", 
                                        xl: "calc(50% - 4px)", 
                                    }
                                }} 
                                variant="outlined" label="At Least" name="minPlayTime" value={formData["minPlayTime"]} onChange={(e) => FilterFormHelper.minPlayTimeInput(e, handleChange, formData.maxPlayTime)} type="number" InputProps={{inputProps: { min: 0, max: 10000, step: 15 }}} />

                                {/* Play Time Max Input Field */}
                                <TextField sx={{
                                    mt: 1,
                                    width: {
                                        xs: "calc(50% - 4px)", 
                                        sm: "100%", 
                                        md: "100%", 
                                        lg: "calc(50% - 4px)", 
                                        xl: "calc(50% - 4px)", 
                                    }
                                }} 
                                variant="outlined" label="At Most" name="maxPlayTime" value={formData["maxPlayTime"]} onChange={(e) => FilterFormHelper.maxPlayTimeInput(e, handleChange, formData.minPlayTime)} type="number" InputProps={{inputProps: { 
                                    min: 0, 
                                    max: 10000, 
                                    step: formData.minPlayTime > formData.maxPlayTime ? formData.minPlayTime - formData.maxPlayTime : 15 
                                }}} />
                            </Box>
                        </Box>




                        {/* Game Weight Filter */}
                        <Box sx={filterGroupingStyles}>
                            {/* Game Weight Header */}
                            <Typography sx={filterHeaderStyles}>
                                Game Weight
                                <ThemedTooltip contents={
                                    <>
                                    <div>Filter by Game Weight: a measure of complexity as determined by player poll results.</div>
                                    <div>1: Light</div>
                                    <div>2: Medium Light</div>
                                    <div>3: Medium</div>
                                    <div>4: Medium Heavy</div>
                                    <div>5: Heavy</div>
                                    </>
                                }/>                    
                            </Typography>
                            {/* Container for Min and Max Inputs */}
                            <Box sx={{
                                display: "flex", 
                                justifyContent: "space-between", 
                                flexDirection: {
                                    xs: "row",
                                    sm: "column",
                                    md: "column",
                                    lg: "row",
                                    xl: "row"
                                }
                            }}>
                                {/* Game Weight Min Input Field */}
                                <TextField sx={{
                                    mt: 1,
                                    width: {
                                        xs: "calc(50% - 4px)", 
                                        sm: "100%", 
                                        md: "100%", 
                                        lg: "calc(50% - 4px)", 
                                        xl: "calc(50% - 4px)", 
                                    }
                                }} 
                                variant="outlined" label="Min." name="minWeight" value={formData["minWeight"]} onChange={(e) => FilterFormHelper.minWeightInput(e, handleChange, formData.maxWeight)} type="number" InputProps={{inputProps: { min: 0, max: 5, step: 0.25 }}} />
                                {/* Game Weight Max Input Field */}
                                <TextField sx={{
                                    mt: 1,
                                    width: {
                                        xs: "calc(50% - 4px)", 
                                        sm: "100%", 
                                        md: "100%", 
                                        lg: "calc(50% - 4px)", 
                                        xl: "calc(50% - 4px)", 
                                    }
                                }} 
                                variant="outlined" label="Max." name="maxWeight" value={formData["maxWeight"]} onChange={(e) => FilterFormHelper.maxWeightInput(e, handleChange, formData.minWeight)} type="number" InputProps={{inputProps: { min: 0, max: 5, 
                                step: formData.minWeight > formData.maxWeight ? formData.minWeight - formData.maxWeight : 0.25 }}} />
                            </Box>
                        </Box>

                        {/* Age Filter */}
                        <Box sx={filterGroupingStyles}>
                            {/* Min. Age Header */}
                            <Typography sx={filterHeaderStyles}>
                                Min. Age
                                <ThemedTooltip contents="Filter by minimum age according to publisher specification and/or player poll results."/>                                            
                            </Typography>
                            {/* Min. Age Input Field */}
                            <TextField sx={{mt: 1, width: "100%"}} variant="outlined" label="Min. Age" name="minAge" value={formData["minAge"]} onChange={(e) => FilterFormHelper.minAgeInput(e, handleChange)} type="number" InputProps={{inputProps: { min: 1, max: 100 }}} />
                            {/* Min. Age Checkboxes */}
                            {formData.minAge && 
                            <Box sx={checkBoxesContainerStyles}>
                                <FormControlLabel control={
                                    <Checkbox 
                                        color="success" 
                                        size="small" 
                                        name="publisherMinAge" value="publisherMinAge"
                                        checked={checkboxes['publisherMinAge']} onChange={handleCheckbox}
                                    />
                                    }
                                    label={
                                    <Typography fontSize="small">
                                        Publisher
                                    </Typography>
                                    }
                                    sx={checkBoxStyles}
                                />
                                <FormControlLabel control={
                                    <Checkbox 
                                        color="success" 
                                        size="small" 
                                        name="communityMinAge" value="communityMinAge"
                                        checked={checkboxes['communityMinAge']} onChange={handleCheckbox}
                                    />
                                    }
                                    label={
                                    <Typography fontSize="small">
                                        Community
                                    </Typography>
                                    }
                                    sx={checkBoxStyles}
                                />
                            </Box>
                            }
                        </Box>
                    </Stack>

                    {/* Sorting Header */}
                    <Box sx={{
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                        textAlign: "center"
                    }}>
                        <Typography>Sorting</Typography>
                    </Box>        

                    {/* Primary Sort ("Sort By") */}
                    <Box sx={{mt: 1}}>
                        <Box sx={{ml: 1, mr: 1, display: "flex"}}>
                            {/* Primary Sort Remove Button */}
                            {selections.primary !== "" && 
                            <IconButton color="error" onClick={handleRemoveSort}>
                                <ClearRoundedIcon fontSize="large" />
                            </IconButton>
                            }
                            {/* Primary Sort Input Field */}
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
                            {/* Primary Sort Arrows. */}
                            {/* Render only the appropriate one. */}
                            {selections.primaryDirection === "ascending" && 
                            <IconButton color="secondary" onClick={() => handleDirectionButton("primary", "descending")}>
                                <NorthRoundedIcon fontSize="large" />
                            </IconButton>
                            }
                            {selections.primaryDirection === "descending" && 
                            <IconButton color="secondary" onClick={() => handleDirectionButton("primary", "ascending")}>
                                <SouthRoundedIcon fontSize="large" />
                            </IconButton>
                            }             
                        </Box>
                    </Box>

                    {/* Secondary Sort ("Then By") */}
                    {/* Render this only when the Primary Sort has a value. */}
                    {selections.primary && 
                    <Box sx={{mt: 1}}>
                        <Box sx={{ml: 1, mr: 1, display: "flex"}}>
                            {/* Secondary Sort Remove Button */}
                            {selections.secondary !== "" && 
                            <IconButton color="error" onClick={() => handleSelect({target: {name: "secondary", value: ""}})}>
                                <ClearRoundedIcon fontSize="large" />
                            </IconButton>
                            }                            
                            {/* Secondary Sort Input Field */}
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
                            {/* Secondary Sort Arrows. */}
                            {/* Render only the appropriate one */}                        
                            {selections.secondaryDirection === "ascending" && 
                            <IconButton color="secondary" onClick={() => handleDirectionButton("secondary", "descending")}>
                                <NorthRoundedIcon fontSize="large" />
                            </IconButton>
                            }
                            {selections.secondaryDirection === "descending" && 
                            <IconButton color="secondary" onClick={() => handleDirectionButton("secondary", "ascending")}>
                                <SouthRoundedIcon fontSize="large" />
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

                    {/* Buttons for returning either a game list or a random game using the filter and sort values. */}
                    <Box sx={{mt: 1, display: "flex", flexDirection: "row", alignContent: "space-evenly", justifyContent: "center"}}>
                        <ThemedButton onClick={handleFilter} text="Get&nbsp;Games" />
                        <ThemedButton onClick={getRandomGame} text="Randomize" />
                    </Box>

                    <QuickFilters formData={formData} setFormData={setFormData} checkboxes={checkboxes} setCheckboxes={setCheckboxes} selections={selections} setSelections={setSelections} />

                </Box>        
            </FormGroup>
        </Paper>
    );
};

export default FilterForm;