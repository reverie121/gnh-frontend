import React, { useEffect, useState } from "react";

import GameNightHelperAPI from "../api/gnh-api";
import GameList from "./GameList";

function Top100Games() {

    const [ top100Games, setTop100Games ] = useState();

    useEffect(() => {
        async function getTop100Games() {
            const res = await GameNightHelperAPI.getTop100Games();
            setTop100Games(res);
        }

        getTop100Games();
    }, [])

    return(
        <div>
            { top100Games && 
            <GameList games={top100Games} /> 
            }
        </div>
    )

}

export default Top100Games;