import React, { useContext } from "react";

import GameListContext from "../context/GameListContext";
import FilterForm from "./FilterForm";

import { gameListClearLocal } from "../helpers/localStorageHelper";

function FilterBox() {
    const { setGameList } = useContext(GameListContext);

    function clearIt() {
        setGameList();
        gameListClearLocal();
    }

    return(
        <div>
            <FilterForm />
            <button onClick={clearIt}>Clear Game List</button>
        </div>
    );
};

export default FilterBox;