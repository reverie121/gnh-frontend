import React from "react";

import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";

function PerPageSelectionBox({ gamesToDisplay, setPage, gamesPerPage, setGamesPerPage }) {

    const handleSelect = (e) => {
        setPage(1);
        setGamesPerPage(e.target.value);
    }

    return(
        <Paper elevation={5} sx={{
            m: 1, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            textAlign: "center", 
            color: "primary.main", 
            borderStyle: "solid", 
            borderWidth: "2px",
            borderRadius: "3px", 
            borderColor: "primary.main"
        }}>

                {/* Per Page Selection Header */}
                <Box sx={{
                    width: "100%", 
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    textAlign: "center"
                }}>
                    <Typography>Display</Typography>
                </Box>      

            <FormControl sx={{mt: 2, mb: 1}}>
                <InputLabel id="games-per-page-label">Games Per Page</InputLabel>
                <Select
                    labelId="games-per-page-label"
                    id="games-per-page"
                    value={gamesPerPage}
                    label="Games Per Page"
                    onChange={handleSelect}
                    sx={{
                        width: "150px", 
                        color: "secondary.dark",
                        fontWeight: "bold"
                    }}
                >                    
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                    {/* <MenuItem value={gamesToDisplay.length}>All</MenuItem> */}
                </Select>    
            </FormControl>      
        </Paper>
    )
}

export default PerPageSelectionBox;