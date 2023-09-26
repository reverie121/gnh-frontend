// Displays BGG data for a game.

import React from "react";
import { Box, Card, CardContent, Link, Stack, Tooltip, Typography } from "@mui/material";

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

    const bgColors = {
        "best": "green",
        "Best": "green",
        "Recommended": "yellowgreen",
        "better": "darkgoldenrod",
        "rest": "darkred",
        "NotRecommended": "darkred"
    }

    const playerCountBoxStyles = {
        color: "white",
        height: "22px",
        width: "22px",
        marginLeft: "1px",
        marginRight: "1px",
        marginTop: "1px",
        borderRadius: "2px",       
    }

    const ratingStyles = {
        color: "white",
        alignSelf: "flex-end",
        display: "inline-block",
        textAlign: "center",
        lineHeight: "40px",
        height: "40px",
        width: "40px",
        fontSize: "large",
        borderRadius: "5px",
        position:"absolute",
        top: "10px",
        right: "10px",
        textShadow: "1px 1px black",
        boxShadow: "2px 2px black",
    }

    const thumbnailStyles = {
        borderRadius: "3px",
        boxShadow: "2px 2px darkgray",
        "&:hover": {
                /* Start the shake animation and make the animation last for 1.5 seconds */
                animation: "shake 1.5s",
            
                /* When the animation is finished, start again */
                animationIterationCount: "infinite",
            }, 
            
            "@keyframes shake": {
                "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
                "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
                "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
                "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
                "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
                "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
                "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
                "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
                "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
                "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
                "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
          }
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
                maxWidth: "90vw",
                minWidth: {
                    xs: "250px", // 0 - 559 px
                    sm: "400px", // 600 - 889 px
                    md: "500px", // 900 - 1199 px
                    lg: "700px", // 1200 - 1535 px
                    xl: "800px" // 1536+ px
                }
            }}
            raised={true}
        >
            <CardContent>
                <Stack direction={{
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                    xl: "row"
                }}>
                    <div>
                        <Box component="img" sx={thumbnailStyles} src={gameData.thumbnail._text} alt={name} />   
                    </div>                 
                    <Stack ml={{
                        xs: 0,
                        sm: 1.5
                    }} pr="40px">
                        <Stack direction="row" alignItems="baseline">
                            <Typography>{name}</Typography>
                            <Typography sx={{fontSize: "smaller", marginLeft: 0.75}}>({gameData.yearpublished._attributes.value})</Typography>
                        </Stack>
                        <Link 
                            href={`https://boardgamegeek.com/boardgame/${gameData._attributes.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            color="primary" 
                            underline="none" 
                            sx={{
                                fontSize: "smaller", 
                                "&:hover": {color: "secondary.main"}}}>
                            View@BGG
                        </Link>
                        <Box mt={1}>
                            Player Count: {playerCount}
                            {/* If game has user votes for suggested player counts, display player count boxes. */}
                            {Number(gameData.poll[0]._attributes.totalvotes) > 0 &&
                                // Container for player count rating boxes.
                                <Stack direction="row">
                                    {gameData.poll[0].resultSummary.slice(0,10).map((r, indx) => {
                                        // limit player count boxes to 10
                                        return <Tooltip key={indx+1} arrow title={
                                            <>
                                            <div>Best: {gameData.poll[0].results[indx].result[0]._attributes.numvotes} vote{gameData.poll[0].results[indx].result[0]._attributes.numvotes !== "1" && 's'}</div>
                                            <div>Recommended: {gameData.poll[0].results[indx].result[1]._attributes.numvotes} vote{gameData.poll[0].results[indx].result[1]._attributes.numvotes !== "1" && 's'}</div>
                                            <div>Not Recommended: {gameData.poll[0].results[indx].result[2]._attributes.numvotes} vote{gameData.poll[0].results[indx].result[2]._attributes.numvotes !== "1" && 's'}</div>                    
                                            </>
                                        }>
                                            <Stack alignItems="center" justifyContent="center" backgroundColor={bgColors[`${r}`]} sx={playerCountBoxStyles} >
                                                {(Number(indx) + 1) === gameData.poll[0].resultSummary.length ? `${(Number(indx) + 1)}+` : (Number(indx) + 1)}
                                            </Stack>
                                        </Tooltip> 
                                        })
                                    }
                                </Stack>
                            }
                            <Typography sx={{fontSize: "smaller"}}>
                                {gameData.poll[0]._attributes.totalvotes} votes
                            </Typography>
                        </Box>
                        <Box mt={1}>
                            Playing Time: {playingTime} minutes
                        </Box>                
                        <Box mt={1}>
                            Age: {gameData.minage._attributes.value}+
                            {/* If game has user votes for suggested minimum age, display community suggested age */}                            
                            {Number(gameData.poll[1]._attributes.totalvotes) > 0 && 
                                <Typography sx={{fontSize: "smaller"}}>
                                    Community: {gameData.poll[1].resultSummary}+ ({gameData.poll[1]._attributes.totalvotes} votes)
                                </Typography>
                            }
                        </Box>
                        {/* If game has user votes for game weight, display game weight. */}                    
                        {Number(gameData.statistics.ratings.numweights._attributes.value) > 0 && 
                            <Box mt={1}>
                                Weight: {Number(gameData.statistics.ratings.averageweight._attributes.value).toFixed(2)}
                                <Typography sx={{fontSize: "smaller"}}>
                                    {gameData.statistics.ratings.numweights._attributes.value} votes
                                </Typography>
                            </Box>
                        }
                    </Stack>
                </Stack>
                <Box backgroundColor={bgColors[`${ratingClass}`]} sx={ratingStyles}>
                    {rating}
                </Box>
            </CardContent>
        </Card>
    );
};

export default GameCard;