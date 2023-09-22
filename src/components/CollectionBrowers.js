import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";

import GameListContext from "../context/GameListContext";
import GameList from "../components/GameList";
import CollectionRequestContainer from "../components/CollectionRequestContainer"

function CollectionBrowser() {
    // Access Context for user and setUser.
    const { gameList } = useContext(GameListContext);

    if (gameList) return (
        <>
            <CollectionRequestContainer />
            <GameList games={gameList} />
        </>
    )

    return(
        <Box sx={{
            marginTop: ".5rem",
            minHeight: "calc(100vh - 20rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant="h6" color="primary" sx={{m: 1}}>Input a BGG username below to start your search...</Typography>
            <CollectionRequestContainer />
        </Box>
    )
}

export default CollectionBrowser;