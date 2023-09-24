// If gameList exists in state, show a button to remove gameList from state.
// If gameList is not present in state, show form to get a collection.

import React, { useContext } from "react";
import { Box } from "@mui/material";

import GameListContext from "../context/GameListContext";
import GetCollectionForm from "./GetCollectionForm";

import ThemedButton from "./themed-components/ThemedButton";

function CollectionRequestContainer({ setLoading }) {
    const { gameList, setGameList } = useContext(GameListContext);

    function clearGameList() {
        setGameList();
    }

    return(
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start"
        }}>
            {gameList && 
                <ThemedButton onClick={clearGameList} text="Clear Games" />
            }
            {!gameList &&
                <GetCollectionForm setLoading={setLoading} />
            }
        </Box>
    );
};

export default CollectionRequestContainer;