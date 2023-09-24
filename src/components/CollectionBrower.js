import React, { useContext, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

import GameListContext from "../context/GameListContext";
import GameList from "./GameList";
import CollectionRequestContainer from "./CollectionRequestContainer"

function CollectionBrowser() {
    // Access Context for user and setUser.
    const { gameList } = useContext(GameListContext);

    const [ loading, setLoading ] = useState(false);

    if (gameList) return (
        <>
            <CollectionRequestContainer setLoading={setLoading} />
            <GameList games={gameList} />
        </>
    )

    return(
        <>
            {loading === true && 
            <LinearProgress color="secondary" sx={{marginTop: 2}} />
            }
            {loading === false && 
            <Box sx={{
                marginTop: ".5rem",
                minHeight: "calc(100vh - 20rem)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Typography variant="h6" color="primary" sx={{m: 1}}>Input a BGG username below to start your search...</Typography>
                <CollectionRequestContainer setLoading={setLoading} />
            </Box>}
        </>
    )
}

export default CollectionBrowser;