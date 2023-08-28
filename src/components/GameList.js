// Displays a list of GameCards from gameList with user input form.

import React, { useContext } from "react";

import GameListContext from "../context/GameListContext";

import CollectionInputsBox from "./CollectionInputsBox";

import GameCard from "./GameCard";

function GameList() {
    const { gameList } = useContext(GameListContext);

    return(
        <div>
            <CollectionInputsBox />
            {gameList.map(g => <GameCard key={g._attributes.id} gameData={g}/>)}
        </div>
    );
};

export default GameList;