import React, { useContext } from "react";

import GameListContext from "../context/GameListContext";

import FilterBox from "./FilterBox";
import GameCard from "./GameCard";

import '../css/GameList.css';

function GameList() {
    const { gameList } = useContext(GameListContext);

    return(
        <div className="GameList">
            <FilterBox />
            {gameList.map(g => <GameCard key={g._attributes.objectid} gameData={g}/>)}
        </div>
    );
};

export default GameList;