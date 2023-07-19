import React, { useContext } from "react";

import GameListContext from "../context/GameListContext";

import GameCard from "./GameCard";

import '../css/GameList.css';

function GameList() {
    const { gameList, setGameList } = useContext(GameListContext);

    function clearIt() {
        setGameList();
    }

    return(
        <div className="GameList">
            <button onClick={clearIt}>Clear</button>
            {gameList.map(g => <GameCard key={g._attributes.objectid} gameData={g}/>)}
        </div>
    );
};

export default GameList;