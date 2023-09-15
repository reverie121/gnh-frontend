import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import UserContext from "./context/UserContext";
import GameListContext from "./context/GameListContext";
import GameList from "./components/GameList";
import CollectionRequestContainer from "./components/CollectionRequestContainer"

import ThemedButton from "./components/themed-components/ThemedButton";

function Home() {
    // Access Context for user and setUser.
    const { user } = useContext(UserContext);
    const { gameList } = useContext(GameListContext);

    if (gameList) return (
        <>
            <CollectionRequestContainer />
            <GameList games={gameList} />
        </>
    )

    if (!user) return(
        <Box sx={{
            marginTop: ".5rem",
            minHeight: "calc(100vh - 20rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant="h1" sx={{
                margin: "0.25rem",
                color: "primary.main",
                fontSize: "3rem",
                textShadow: ".075rem .075rem darkturquoise",            
            }}>Game Night Helper</Typography>
            <Typography variant="h5" color="primary" sx={{m: 1}}>Time to choose a game? I can help.</Typography>
            <div>
                <Link to="/login">
                    <ThemedButton text="Log In" />
                </Link>
                <Link to="/signup">
                    <ThemedButton text="Sign Up" />
                </Link>
            </div>
            <Typography variant="h6" color="primary" sx={{m: 1}}>Or input a BGG username below to start your search...</Typography>
            <CollectionRequestContainer />
        </Box>
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

export default Home;