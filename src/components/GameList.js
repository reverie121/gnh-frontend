// Displays a list of GameCards from gameList with user input form.

import React, { useContext } from "react";

import { Box } from "@mui/material";

import GameListContext from "../context/GameListContext";

import CollectionInputsBox from "./CollectionInputsBox";

import GameCard from "./GameCard";

function GameList() {
    const { gameList } = useContext(GameListContext);

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
            <CollectionInputsBox />
            <Box sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            }}>
                {gameList.length > 1 && 
                <Box sx={{
                    m: 1, 
                    p: 1, 
                    textAlign: "center", 
                    color: "primary.main", 
                    borderStyle: "solid", 
                    borderWidth: "2px",
                    borderRadius: "3px", 
                    borderColor: "primary.main"
                }}>
                    • Showing {gameList.length} Games •
                </Box>
                }
                {gameList.map(g => <GameCard key={g._attributes.id} gameData={g}/>)}
            </Box>
        </Box>
    );
};

export default GameList;