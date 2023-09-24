import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

import GameNightHelperAPI from "../api/gnh-api";
import GameList from "./GameList";

function Top100Games() {

    const [ top100Games, setTop100Games ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function getTop100Games() {
            const res = await GameNightHelperAPI.getTop100Games();
            setTop100Games(res);
            setLoading(false);
        }

        getTop100Games();
    }, [])

    return(
        <div>
            { loading === true && 
                <LinearProgress color="secondary" sx={{marginTop: 2}} />
            }
            { loading === false && top100Games && 
            <GameList games={top100Games} /> 
            }
        </div>
    )

}

export default Top100Games;