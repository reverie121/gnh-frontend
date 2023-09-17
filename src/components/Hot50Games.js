import React, { useEffect, useState } from "react";

import GameNightHelperAPI from "../api/gnh-api";
import GameList from "./GameList";

function Hot50Games() {

    const [ hot50Games, setHot50Games ] = useState();

    useEffect(() => {
        async function getHot50Games() {
            const res = await GameNightHelperAPI.getHot50Games();
            setHot50Games(res);
        }

        getHot50Games();
    }, [])

    return(
        <div>
            { hot50Games && 
            <GameList games={hot50Games} /> 
            }
        </div>
    )

}

export default Hot50Games;