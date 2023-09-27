// Displays data for a BGG user's Logged Play.

import React from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

function UserPlayCard( { play, thumbnail } ) {

    const src = thumbnail === undefined || thumbnail === "no image available" ? "/img/no_thumbnail.jpg" : thumbnail;

    const thumbnailStyles = {
        marginLeft: 0.5,
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
                borderRadius: 1, 
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
                <Stack>
                    <Typography sx={{
                        backgroundColor: "primary.transparent",
                        color: "primary.dark", 
                        border: "solid", 
                        borderColor: "primary.main",
                        borderRadius: 1, 
                        borderWidth: "2px",
                        padding: 1
                    }}>
                        {play._attributes.date}
                    </Typography>
                    <Stack direction={{
                        xs: "column",
                        sm: "row"
                    }} mt={1}>
                        <Box mt={0.5}>
                            <Box component="img" sx={thumbnailStyles} src={src} alt={play.item._attributes.name} />
                        </Box>
                        <Box ml={1.5}>
                            <Typography color="primary" sx={{fontWeight: "bold"}}>
                                {play.item._attributes.name}
                            </Typography>
                            {play._attributes.quantity &&
                            <Typography>
                                Plays: {play._attributes.quantity}
                            </Typography> }
                            {play._attributes.location &&
                            <Typography>
                                Location: {play._attributes.location}
                            </Typography> }
                            {play.comments && 
                            <Box>
                                <Typography>Comment:</Typography>
                                {play.comments._text.split("\n").map((l, indx) => <Typography key={indx} ml={1}>{l}</Typography>)}
                            </Box> }
                        </Box>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default UserPlayCard;