import React, { useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";

import GameNightHelperAPI from "../api/gnh-api";
import GameList from "./GameList";

function Hot50Games() {

    const [ hot50Games, setHot50Games ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function getHot50Games() {
            const res = await GameNightHelperAPI.getHot50Games();
            setHot50Games(res);
            setLoading(false);
        }

        getHot50Games();
    }, [])

    return(
        <div>
            { loading === true && 
                <LinearProgress color="secondary" sx={{marginTop: 2}} />
            }            
            { loading === false && hot50Games && 
            <GameList games={hot50Games} /> 
            }
        </div>
    )

}

export default Hot50Games;