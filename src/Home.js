import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import UserContext from "./context/UserContext";
import GameListContext from "./context/GameListContext";
import GameList from "./components/GameList";
import GetCollectionForm from "./components/GetCollectionForm";
import { gameListFromLocal } from "./helpers/localStorageHelper";

import './css/Home.css';

function Home() {
    // Access Context for user and setUser.
    const { user } = useContext(UserContext);
    const { gameList, setGameList } = useContext(GameListContext);

    useEffect(() => {
        const localGameList = gameListFromLocal();
        if (localGameList) setGameList(localGameList);
    }, [])

    // if (gameList) gameList.map(g => console.log(g))
    if (gameList) return (
        <GameList />
    )

    if (!user) return(
        <div className="Home">
            <h1>Game Night Helper</h1>
            <h2>Time to choose a game? I can help.</h2>
            <div>
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
            </div>
            <h2>Or dive right in...</h2>
            <GetCollectionForm />
        </div>
    )

    return(
        <div className="Home">
            <h1>Game Night Helper</h1>
            <h2>Time to choose a game? I can help.</h2>
            <GetCollectionForm />
        </div>
    )
}

export default Home;