// Displays BGG data for a game.

import React from "react";

import { Box, Card, CardContent, Stack } from "@mui/material";

import '../css/GameCard.css';

/* Component for displaying game summary cards in a game list. */

function GameCard( {gameData} ) {
    // console.log(gameData)

    // Get game name or, if multiple, get first name from array of names.
    const name = Array.isArray(gameData.name) ? gameData.name[0]._attributes.value : gameData.name._attributes.value;

    // Games with no rating votes return "0" as the average. If no votes, use a hyphen for rating. Otherwise get rating rounded to 1 decimal.
    const rating = gameData.statistics.ratings.average._attributes.value !== "0" ? Number(gameData.statistics.ratings.average._attributes.value).toFixed(1) : '-';

    // If min and max player counts are the same, set value to that number. Otherwise set value to range.
    const playerCount = gameData.minplayers._attributes.value === gameData.maxplayers._attributes.value ? gameData.minplayers._attributes.value : `${gameData.minplayers._attributes.value}-${gameData.maxplayers._attributes.value}`;

    // If min and max playing time (minutes) are the same, set value to that number. Otherwise set value to range.
    const playingTime = gameData.minplaytime._attributes.value === gameData.maxplaytime._attributes.value ? `${gameData.minplaytime._attributes.value}` : `${gameData.minplaytime._attributes.value}-${gameData.maxplaytime._attributes.value}`;

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
        <Card 
            sx={{
                m: 1, 
                border: "solid", 
                borderColor: "primary.main",
                borderRadius: "3px", 
                borderWidth: "2px",
                position: "relative",
                maxWidth: "90vw"
            }}
            raised={true}
        >
            <CardContent sx={{width: "100%"}}>
                <Stack direction="row">
                    <div>
                        {gameData.thumbnail && <img alt={name} src={gameData.thumbnail._text} className="Thumbnail" />}
                    </div>
                    <Stack ml={1} pr="40px">
                        <div>
                            {name} 
                            <span className="YearPublished">({gameData.yearpublished._attributes.value})</span>
                        </div>
                        <div>
                            <a href={`https://boardgamegeek.com/boardgame/${gameData._attributes.id}`} target="_blank" rel="noopener noreferrer" className="BGGLink">View@BGG</a>
                        </div>
                        <Box mt={1}>
                            Player Count: {playerCount}
                            {/* If game has user votes for suggested player counts, display player count boxes. */}
                            {Number(gameData.poll[0]._attributes.totalvotes) > 0 &&
                                // Container for player count rating boxes.
                                <Stack direction="row">
                                    {gameData.poll[0].resultSummary.slice(0,10).map((r, indx) => {
                                        // limit player count boxes to 10
                                        return <div key={indx+1} className={`playerCountBox ${r}`}>
                                            {(Number(indx) + 1) === gameData.poll[0].resultSummary.length ? `${(Number(indx) + 1)}+` : (Number(indx) + 1)}
                                        </div>
                                        })
                                    }
                                </Stack>
                            }
                            <div className="supplementaryData">
                                {gameData.poll[0]._attributes.totalvotes} votes
                            </div>
                        </Box>
                        <Box mt={1}>
                            Playing Time: {playingTime} minutes
                        </Box>                
                        <Box mt={1}>
                            Age: {gameData.minage._attributes.value}+
                            {/* If game has user votes for suggested minimum age, display community suggested age */}                            
                            {Number(gameData.poll[1]._attributes.totalvotes) > 0 && 
                                <div className="supplementaryData">
                                    Community: {gameData.poll[1].resultSummary}+ ({gameData.poll[1]._attributes.totalvotes} votes)
                                </div>
                            }
                        </Box>
                        {/* If game has user votes for game weight, display game weight. */}                    
                        {Number(gameData.statistics.ratings.numweights._attributes.value) > 0 && 
                            <Box mt={1}>
                                Weight: {Number(gameData.statistics.ratings.averageweight._attributes.value).toFixed(2)}
                                <div className="supplementaryData">
                                    {gameData.statistics.ratings.numweights._attributes.value} votes
                                </div>
                            </Box>
                        }
                    </Stack>
                </Stack>
                <div className={`Rating ${ratingClass}`}>
                    {rating}
                </div>
            </CardContent>
        </Card>
    );
};

export default GameCard;