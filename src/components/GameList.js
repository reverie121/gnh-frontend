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
            width: "100%"
            }}>
                {gameList.map(g => <GameCard key={g._attributes.id} gameData={g}/>)}
            </Box>
        </Box>
    );
};

export default GameList;