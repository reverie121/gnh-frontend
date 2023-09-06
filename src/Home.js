import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import UserContext from "./context/UserContext";
import GameListContext from "./context/GameListContext";
import GameList from "./components/GameList";
import CollectionRequestContainer from "./components/CollectionRequestContainer"
import { gameListFromLocal } from "./helpers/localStorageHelper";

import ThemedButton from "./components/themed-components/ThemedButton";

function Home() {
    // Access Context for user and setUser.
    const { user } = useContext(UserContext);
    const { gameList, setGameList } = useContext(GameListContext);

    useEffect(() => {
        const localGameList = gameListFromLocal();
        if (localGameList) setGameList(localGameList);
    }, [setGameList])

    if (gameList) return (
        <GameList />
    )

    if (!user) return(
        <Box sx={{
            marginTop: ".5rem",
            minHeight: "calc(100vh - 20rem)",
            minWidth: "550px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Typography variant="h1" sx={{
                margin: "0.25rem",
                color: "indigo",
                fontSize: "3rem",
                textShadow: ".075rem .075rem darkturquoise",            
            }}>Game Night Helper</Typography>
            <Typography variant="h4" color="primary" sx={{m: 1}}>Time to choose a game? I can help.</Typography>
            <div>
                <Link to="/login">
                    <ThemedButton text="Log In" />
                </Link>
                <Link to="/signup">
                    <ThemedButton text="Sign Up" />
                </Link>
            </div>
            <h2>Or dive right in...</h2>
            <CollectionRequestContainer />
        </Box>
    )

    return(
        <div className="Home">
            <h1>Game Night Helper</h1>
            <h2>Time to choose a game? I can help.</h2>
            <CollectionRequestContainer />
        </div>
    )
}

export default Home;