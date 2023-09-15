import React from "react";

import FilterForm from "./FilterForm";
import PerPageSelectionBox from "./PerPageSelectionBox";

function CollectionInputsBox({ games, gamesToDisplay, setGamesToDisplay , setPage, gamesPerPage, setGamesPerPage }) {

    return(
        <div>
            <PerPageSelectionBox gamesToDisplay={gamesToDisplay} setPage={setPage} gamesPerPage={gamesPerPage} setGamesPerPage={setGamesPerPage} />            
            <FilterForm games={games} setGamesToDisplay={setGamesToDisplay} />
        </div>
    );
};

export default CollectionInputsBox;