// If gameList exists in state, show a button to remove gameList from state.
// If gameList is not present in state, show form to get a collection.

import React, { useContext } from "react";

import GameListContext from "../context/GameListContext";
import { gameListClearLocal } from "../helpers/localStorageHelper";
import GetCollectionForm from "./GetCollectionForm";

import '../css/CollectionRequestForm.css';

function CollectionRequestForm() {
    const { gameList, setGameList } = useContext(GameListContext);

    function clearGameList() {
        setGameList();
        gameListClearLocal();
    }

    return(
        <div id="CollectionRequestContainer">
            {gameList && <button onClick={clearGameList}>Clear Game List</button>}
            {!gameList &&
                <GetCollectionForm />
            }
        </div>
    );
};

export default CollectionRequestForm;