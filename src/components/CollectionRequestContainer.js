// If gameList exists in state, show a button to remove gameList from state.
// If gameList is not present in state, show form to get a collection.

import React, { useContext } from "react";
import { Box } from "@mui/material";

import GameListContext from "../context/GameListContext";
import { gameListClearLocal } from "../helpers/localStorageHelper";
import GetCollectionForm from "./GetCollectionForm";

import ThemedButton from "./themed-components/ThemedButton";

import '../css/CollectionRequestForm.css';

function CollectionRequestForm() {
    const { gameList, setGameList } = useContext(GameListContext);

    function clearGameList() {
        setGameList();
        gameListClearLocal();
    }

    return(
        <Box id="CollectionRequestContainer">
            {gameList && 
                <ThemedButton onClick={clearGameList} text="Clear Game List" />
            }
            {!gameList &&
                <GetCollectionForm />
            }
        </Box>
    );
};

export default CollectionRequestForm;