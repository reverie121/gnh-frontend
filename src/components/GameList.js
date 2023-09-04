// Displays a list of GameCards from gameList with user input form.

import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";

import GameListContext from "../context/GameListContext";

import CollectionInputsBox from "./CollectionInputsBox";
import ThemedPaginationBox from "./themed-components/ThemedPaginationBox";
import GameCard from "./GameCard";

function GameList() {
    // Initialize state for pagination.
    const [ gamesPerPage, setGamesPerPage ] = useState(25);
    const [ page, setPage ] = useState(1);

    const { gameList } = useContext(GameListContext);

    // Calculate the number of pages and the first and last game indexes displayed on the current page.
    const numberOfPages = Math.ceil(gameList.length / gamesPerPage);
    const first = gamesPerPage * (page - 1) + 1;
    const last = gamesPerPage * (page) < gameList.length ? gamesPerPage * (page) : gameList.length;

    const handlePageChange = (e, val) => {
        setPage(val);
    }

    return(
        <Box sx={{
            display: "flex",
            flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row"
            }
        }}>
            
            <CollectionInputsBox  gameList={gameList} setPage={setPage} gamesPerPage={gamesPerPage} setGamesPerPage={setGamesPerPage} />

            <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            }}>

                {/* Pagination control at top of page. Not needed if there is only one page of game data. */}
                {numberOfPages > 1 && gamesPerPage !== gameList.length && 
                <ThemedPaginationBox page={page} numberOfPages={numberOfPages} handlePageChange={handlePageChange} />
                }

                {/* Display a message telling which and how many results are on the page. */}
                <Box sx={{
                    m: 1, 
                    p: 1, 
                    display: "flex", 
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    textAlign: "center", 
                    color: "primary.main",                
                }}>
                    {gameList.length < 1 && 
                        <>
                        <Typography sx={{fontWeight: "bold"}}>No Games Found!</Typography>
                        <Typography>Change your filter options for better results.</Typography>                        
                        </>
                    }
                    {gameList.length > 1 && 
                    <Box sx={{display: "flex"}}>
                        <Typography>Showing&nbsp;</Typography>
                        <Typography sx={{color: "secondary.dark", fontWeight: "bold"}}>{first}-{last}</Typography> 
                        <Typography>&nbsp;of {gameList.length} Games</Typography>
                    </Box>    
                    }   
                </Box>

                {/* *** Game Data displayed here *** */}
                {/* Show the portion of the gameList for the current page. */}
                {gameList.slice(first-1, last).map(g => <GameCard key={g._attributes.id} gameData={g}/>)}

                {/* Pagination control at bottom of page. Not needed if there is only one page of game data. */}
                {gameList.length > 1 && numberOfPages > 1 && gamesPerPage !== gameList.length && 
                <ThemedPaginationBox page={page} numberOfPages={numberOfPages} handlePageChange={handlePageChange} />
                }

            </Box>
        </Box>
    );
};

export default GameList;