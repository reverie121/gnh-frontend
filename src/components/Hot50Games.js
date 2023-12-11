import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

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
        <>
            {loading === true && 
            <Stack alignItems="center">
                <CircularProgress color="secondary" sx={{marginTop: 2}} />
                <Typography variant="h6" color="primary" sx={{m: 1}}>One moment while I get that information from BoardGameGeek...</Typography>
            </Stack>
            }                  
            { loading === false && hot50Games && 
            <GameList games={hot50Games} /> 
            }
        </>
    )

}

export default Hot50Games;