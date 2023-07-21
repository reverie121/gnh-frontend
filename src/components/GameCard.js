import React from "react";

import '../css/GameCard.css';

function GameCard( {gameData} ) {
    console.log(gameData)

    const name = Array.isArray(gameData.name) ? gameData.name[0]._attributes.value : gameData.name._attributes.value;

    const rating = Number(gameData.statistics.ratings.average._attributes.value).toFixed(1);

    const playerCount = gameData.minplayers._attributes.value === gameData.maxplayers._attributes.value ? gameData.minplayers._attributes.value : `${gameData.minplayers._attributes.value}-${gameData.maxplayers._attributes.value}`;

    const playingTime = gameData.minplaytime._attributes.value === gameData.maxplaytime._attributes.value ? `${gameData.minplaytime._attributes.value}` : `${gameData.minplaytime._attributes.value}-${gameData.maxplaytime._attributes.value}`;

    const computePlayerCount = () => {
        function getPlayerCountRating(arr) {
            let highestCount = 0;
            let rating = "";
            arr.map(d => {
                if (Number(d._attributes.numvotes) > highestCount) {
                    highestCount = Number(d._attributes.numvotes);
                    rating = d._attributes.value.replace(" ", "");
                } return ''
            })
            return rating;
        }
        let playerCountArr = [];
        gameData.poll[0].results.map(r => playerCountArr.push(getPlayerCountRating(r.result)))
        return playerCountArr;
    }
    const playerCountRatings = computePlayerCount();

    const computePlayerAge = () => {
        let ageSum = 0;
        gameData.poll[1].results.result.map(r => ageSum = ageSum + (parseInt(r._attributes.value) * parseInt(r._attributes.numvotes)));
        return Number(ageSum / gameData.poll[1]._attributes.totalvotes).toFixed(0);
    }
    const communityPlayerAge = computePlayerAge();

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
                        {name} <span className="YearPublished">({gameData.yearpublished._attributes.value})</span>
                    </div>
                    <div>
                        <a href={`https://boardgamegeek.com/boardgame/${gameData._attributes.id}`} className="BGGLink">View@BGG</a>
                    </div>
                    <div className="PlayerCount">
                        Player Count: {playerCount}
                        <div className="playerCountBoxHolder">
                            {playerCountRatings.map((r, indx) => 
                                    <div key={indx+1} className={`playerCountBox ${r}`}>
                                        {(Number(indx) + 1) === playerCountRatings.length ? `${(Number(indx) + 1)}+` : (Number(indx) + 1)}
                                    </div>
                                )}
                        </div>
                        <div className="supplementaryData">
                            {gameData.poll[0]._attributes.totalvotes} votes
                        </div>
                    </div>
                    <div className="PlayingTime">
                        Playing Time: {playingTime} minutes
                    </div>
                    {gameData.minage._attributes.value > 0 && <div className="Age">
                        Age: {gameData.minage._attributes.value}+
                        {gameData.poll[1]._attributes.totalvotes > 0 && 
                            <div className="supplementaryData">
                                Community: {communityPlayerAge}+ ({gameData.poll[1]._attributes.totalvotes} votes)
                            </div>
                        }
                    </div>}
                    <div className="Weight">
                        Weight: {Number(gameData.statistics.ratings.averageweight._attributes.value).toFixed(2)}
                        <div className="supplementaryData">
                            {gameData.statistics.ratings.numweights._attributes.value} votes
                        </div>
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