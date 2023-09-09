import React, { useContext, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import UserContext from "../context/UserContext";
import GameNightHelperAPI from "../api/gnh-api";
import ThemedButton from "./themed-components/ThemedButton";
import listFilters from "../helpers/quickFilterHelper";

function QuickFilters({ formData, setFormData, checkboxes, setCheckboxes, selections, setSelections }) {

    // STATE & CONTEXT

    const [ open, setOpen ] = useState(false)
    const [ quickFilterName, setQuickFilterName ] = useState("");

    const { user, setUser } = useContext(UserContext);

    // Get array of active filters (descriptive).
    const filterList = listFilters(formData, checkboxes, selections);

    // *** USER INPUT HANDLERS ***
    // Updates state in response to user input.    

    // Handles clicking the 'Add' button in the Quick Filter section (opens dialog box).
    const openSaveDialog = (e) => {
        setOpen(true);
    }

    // Handles changes to the name input in the Quick Filter Dialog Box.
    const handleQuickFilterName = (e) => {
        const { value } = e.target;
        setQuickFilterName(value);
    }

    // Handles clicking the 'Cancel' button in the Quick Filter dialog box.
    const handleCancelQuickFilter = (e) => {
        setOpen(false);
        setQuickFilterName("");
    }

    // Handles clicking the 'Save' button in the Quick Filter dialog box.
    const handleSaveQuickFilter = async (e) => {
        if (quickFilterName !== "") {
            const data = {
                username: user.username, 
                filterName: quickFilterName, 
                filterSettings: JSON.stringify([ formData, checkboxes, selections ])
            }
            await GameNightHelperAPI.saveQuickFilter(data);
            const filtersRes = await GameNightHelperAPI.getQuickFilters(user.username);
            setUser(() => ({
                ...user, 
                quickFilters: filtersRes
            }))
            setOpen(false);
            setQuickFilterName("");
        }
        // Currently, nothing happens if the Quick Filter Name input is empty.
    }

    // Handles clicking the remove buttons next to a user's Quick Filter.
    const handleRemoveQuickFilter = async (id) => {
        await GameNightHelperAPI.removeQuickFilter(id);
        const filtersRes = await GameNightHelperAPI.getQuickFilters(user.username);
        setUser(() => ({
            ...user, 
            quickFilters: filtersRes
        }))
    }

    // Handles clicking the 'Apply' button next to a user's Quick Filter.
    const handleApplyQuickFilter = (filterSettings) => {
        const [ quickFormData, quickCheckboxes, quickSelections ] = JSON.parse(filterSettings);
        setFormData(quickFormData);
        setCheckboxes(quickCheckboxes);
        setSelections(quickSelections);
    }

    return(
        <>
        {/* Quick Filters Header */}
        {user && 
            <Box sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",  
            textAlign: "center",
            mt: 1
        }}>
            <Typography>Quick Filters</Typography>
        </Box>}

        {user && 
        <Box sx={{p: 1}}>

            {/* If user has no Quick Filters, display a helpful ToolTip. */}
            {user.quickFilters.length < 1 && 
            <Tooltip placement="top" title="
                Quick Filters allow you to save your most commonly used filters for easy access. To save your current filter and sort settings as a Quick Filter, click the button below.
            ">
                <Typography sx={{
                    textAlign: "center", 
                    fontSize: "small", 
                    "&:hover": {color: "secondary.main"}
                }}>
                    What are Quick Filters?
                </Typography>
            </Tooltip>}

            {/* Save Quick Filter Button */}
            <Box sx={{mt: 1, display: "flex", flexDirection: "row", alignContent: "space-evenly", justifyContent: "center"}}>
                <ThemedButton onClick={openSaveDialog} text="Add" />

                <Dialog open={open} onClose={() => setOpen(false)}>
                    {/* Display Title if the list of active filters is not empty. */}
                    {filterList.length > 0 && 
                    <DialogTitle sx={{color: "primary.main"}}>Save Filters to Quick Filter?</DialogTitle>
                    }
                    {/* Display a helpful message if the list of active filters is empty. */}
                    {filterList.length === 0 && 
                    <DialogContent sx={{color: "primary.main"}}>
                        <DialogContentText>To save a Quick Filter you must first set one or more Filters or Sort conditions.</DialogContentText>
                    </DialogContent>
                    }
                    {/* Display each description from the list of active filters if the list of active filters is not empty. */}
                    <DialogContent>
                        { filterList.length > 0 && 
                        filterList.map((l, indx) => <DialogContentText key={indx}>{l}</DialogContentText>)
                        }
                    </DialogContent>
                    <DialogActions>
                        <FormControl fullWidth>
                            {/* Display Quick Filter name input if list of filters is not empty. */}
                            {filterList.length > 0 && 
                            <TextField label="*Quick Filter Name" onChange={handleQuickFilterName} value={quickFilterName} />
                            }
                            <Stack 
                            direction="row" 
                            sx={{
                                justifyContent: "space-evenly", 
                                mt: 1
                            }}>
                                {/* Cancel Button */}
                                <ThemedButton onClick={handleCancelQuickFilter} text="Cancel" />
                                {/* Save Button (display only if list of filters is not empty) */}
                                {filterList.length > 0 && 
                                <ThemedButton onClick={handleSaveQuickFilter} text="Save" />
                                }
                            </Stack>
                        </FormControl>
                    </DialogActions>
                </Dialog>
            </Box>

            {/* If user has Quick Filters, display them here with remove and apply buttons for each. */}
            {user.quickFilters.length > 0 && 
            <Stack sx={{mt: 1}}>
                {user.quickFilters.map(f => 
                    <Stack key={f.id} direction="row" sx={{alignItems: "center", justifyContent: "space-between"}}>
                        {/* Button to remove Quick Filter. */}
                        <IconButton onClick={() => handleRemoveQuickFilter(f.id)}>
                            <HighlightOffRoundedIcon sx={{color: "warning.dark"}} />
                        </IconButton>
                        {/* Quick Filter name. */}
                        <Typography sx={{pl: 1, pr: 1, width: "100%"}}>
                            {f.filterName}
                        </Typography>
                        {/* Button to apply Quick Filter. */}
                        <ThemedButton text="Apply" onClick={() => handleApplyQuickFilter(f.filterSettings)} />
                    </Stack>
                )}
            </Stack>
            }

        </Box>}             
        </>
    )
}

export default QuickFilters;