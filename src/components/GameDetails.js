import React from "react";

import '../css/GameCard.css';

const entities = require("entities");

function GameDetails( {gameData} ) {
    console.log(gameData)

    const name = Array.isArray(gameData.name) ? gameData.name[0]._attributes.value : gameData.name._attributes.value;

    const description = gameData.description._text.split('&#10;');

    return(
        <div className="GameCard">
            <div className="LeftBox">
                <img alt={name} src={gameData.thumbnail._text} />

            </div>
            <div className="RightBox">
                <div>
                    {name}
                </div>
                <div>
                    {description.map(p => <p key={gameData._attributes.id}>{entities.decodeHTML(p)}</p>)}
                </div>
            </div>
        </div>
    );
};

export default GameDetails;