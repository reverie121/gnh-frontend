import React from "react";

import '../css/GameCard.css';

function GameCard( {gameData} ) {
    console.log(gameData)

    const name = Array.isArray(gameData.name) ? gameData.name[0]._attributes.value : gameData.name._attributes.value;

    const rating = Number(gameData.statistics.ratings.average._attributes.value).toFixed(1)

    const playerCount = gameData.minplayers._attributes.value === gameData.maxplayers._attributes.value ? gameData.minplayers._attributes.value : `${gameData.minplayers._attributes.value}-${gameData.maxplayers._attributes.value}`

    const playingTime = gameData.minplaytime._attributes.value === gameData.maxplaytime._attributes.value ? `${gameData.minplaytime._attributes.value}` : `${gameData.minplaytime._attributes.value}-${gameData.maxplaytime._attributes.value}`

    // ratingClass will be used to apply the appropriate background color to the rating box.
    let ratingClass;
    if (rating >= 7) {
        ratingClass="best";
    } else if (rating >= 6) {
        ratingClass="better";
    } else {
        ratingClass="rest";
    }

    return(
        <div className="GameCard">
            <div className="BoxContainer">

                <div className="LeftBox">
                    <img alt={name} src={gameData.thumbnail._text} className="Thumbnail" />

                </div>
                <div className="RightBox">
                    <div className="GameName">
                        {name}
                    </div>
                    <div>
                        <a href={`https://boardgamegeek.com/boardgame/${gameData._attributes.id}`} className="BGGLink">View@BGG</a>
                    </div>
                    <div className="PlayerCount">
                        Player Count: {playerCount}
                    </div>
                    <div className="PlayingTime">
                        Playing Time: {playingTime} minutes
                    </div>
                    {gameData.minage._attributes.value > 0 && <div className="Age">
                        Age: {gameData.minage._attributes.value}+
                    </div>}
                    <div className="Weight">
                        Weight: {Number(gameData.statistics.ratings.averageweight._attributes.value).toFixed(2)}
                    </div>
                </div>

            </div>

            <div className={`Rating ${ratingClass}`}>
                {rating}
            </div>
        </div>
    );
};

export default GameCard;