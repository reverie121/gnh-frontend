import React from "react";

import FilterForm from "./FilterForm";
import PerPageSelectionBox from "./PerPageSelectionBox";
import CollectionRequestContainer from "./CollectionRequestContainer"

function CollectionInputsBox({ gameList, setPage, gamesPerPage, setGamesPerPage }) {

    return(
        <div>
            <PerPageSelectionBox gameList={gameList} setPage={setPage} gamesPerPage={gamesPerPage} setGamesPerPage={setGamesPerPage} />            
            <FilterForm />
            <CollectionRequestContainer />
        </div>
    );
};

export default CollectionInputsBox;