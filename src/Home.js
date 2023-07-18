import React, { useContext } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import UserContext from "./context/UserContext";

import './css/Home.css';

function Home() {
    // Access Context for user and setUser.
    const { user } = useContext(UserContext);

    if (!user) return(
        <div className="Home">
            <h1>Game Night Helper</h1>
            <h2>Time to choose a game? I can help.</h2>
            <div>
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
            </div>
            <h2>Or just dive right in...</h2>
        </div>
    )

    return(
        <div className="Home">
            <h1>Game Night Helper</h1>
            <h2>Time to choose a game? I can help.</h2>
        </div>
    )
}

export default Home;