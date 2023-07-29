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