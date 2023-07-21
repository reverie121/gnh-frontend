import React from "react";

import '../css/GameCard.css';

/* Component for displaying game summary cards in a game list. */

function GameCard( {gameData} ) {
    console.log(gameData)

    // Get game name or, if multiple, get first name from array of names.
    const name = Array.isArray(gameData.name) ? gameData.name[0]._attributes.value : gameData.name._attributes.value;

    // Games with no rating votes return "0" as the average. If no votes, use a hyphen for rating. Otherwise get rating rounded to 1 decimal.
    const rating = gameData.statistics.ratings.average._attributes.value !== "0" ? Number(gameData.statistics.ratings.average._attributes.value).toFixed(1) : '-';

    // If min and max player counts are the same, set value to that number. Otherwise set value to range.
    const playerCount = gameData.minplayers._attributes.value === gameData.maxplayers._attributes.value ? gameData.minplayers._attributes.value : `${gameData.minplayers._attributes.value}-${gameData.maxplayers._attributes.value}`;

    // If min and max playing time (minutes) are the same, set value to that number. Otherwise set value to range.
    const playingTime = gameData.minplaytime._attributes.value === gameData.maxplaytime._attributes.value ? `${gameData.minplaytime._attributes.value}` : `${gameData.minplaytime._attributes.value}-${gameData.maxplaytime._attributes.value}`;

    // Returns an array of player count ratings ('Best', 'Recommended', 'Not Recommended') where index+1 = player count.
    const computePlayerCount = () => {
        // Get rating with highest vote count for a player count value (arr contains results for each rating for that value).
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
        // Initialize output array.
        let playerCountArr = [];
        // Get rating for each player count value and push to output array, or log error.
        try {
            gameData.poll[0].results.map(r => playerCountArr.push(getPlayerCountRating(r.result)))
        }
        catch(err) {
            console.log(err)
        }
        return playerCountArr;
    }
    // If game has votes for player count, compute player count votes.
    let playerCountRatings;
    if (Number(gameData.poll[0]._attributes.totalvotes) > 0) playerCountRatings = computePlayerCount();

    // Returns average minimum age from user poll results.
    const computePlayerAge = () => {
        let ageSum = 0;
        gameData.poll[1].results.result.map(r => ageSum = ageSum + (parseInt(r._attributes.value) * parseInt(r._attributes.numvotes)));
        return Number(ageSum / gameData.poll[1]._attributes.totalvotes).toFixed(0);
    }
    let communityPlayerAge;
    // If game has votes for suggested age, compute suggested age.
    if (Number(gameData.poll[1]._attributes.totalvotes) > 0) communityPlayerAge = computePlayerAge();

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
                        {/* If game has user votes for suggested player counts, display player count boxes. */}
                        {Number(gameData.poll[0]._attributes.totalvotes) > 0 &&
                            <div className="playerCountBoxHolder">
                                {playerCountRatings.map((r, indx) => 
                                        <div key={indx+1} className={`playerCountBox ${r}`}>
                                            {(Number(indx) + 1) === playerCountRatings.length ? `${(Number(indx) + 1)}+` : (Number(indx) + 1)}
                                        </div>
                                    )
                                }
                            </div>
                        }
                        <div className="supplementaryData">
                            {gameData.poll[0]._attributes.totalvotes} votes
                        </div>
                    </div>
                    <div className="PlayingTime">
                        Playing Time: {playingTime} minutes
                    </div>                
                    <div className="Age">
                        Age: {gameData.minage._attributes.value}+
                        {/* If game has user votes for suggested minimum age, display community suggested age */}                            
                        {Number(gameData.poll[1]._attributes.totalvotes) > 0 && 
                            <div className="supplementaryData">
                                Community: {communityPlayerAge}+ ({gameData.poll[1]._attributes.totalvotes} votes)
                            </div>
                        }
                    </div>
                    {/* If game has user votes for game weight, display game weight. */}                    
                    {Number(gameData.statistics.ratings.numweights._attributes.value) > 0 && 
                        <div className="Weight">
                            Weight: {Number(gameData.statistics.ratings.averageweight._attributes.value).toFixed(2)}
                            <div className="supplementaryData">
                                {gameData.statistics.ratings.numweights._attributes.value} votes
                            </div>
                        </div>
                    }
                </div>

            </div>

            <div className={`Rating ${ratingClass}`}>
                {rating}
            </div>
        </div>
    );
};

export default GameCard;