import React, { useContext } from "react";

import GameListContext from "../context/GameListContext";

import CollectionInputsBox from "./CollectionInputsBox";

import GameCard from "./GameCard";

import '../css/GameList.css';

function GameList() {
    const { gameList } = useContext(GameListContext);

    return(
        <div className="GameList">
            <CollectionInputsBox />
            {gameList.map(g => <GameCard key={g._attributes.id} gameData={g}/>)}
        </div>
    );
};

export default GameList;