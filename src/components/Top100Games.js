import React, { useEffect, useState } from "react";
import { CircularProgress, Stack, Typography } from "@mui/material";

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
        <>
            {loading === true && 
            <Stack alignItems="center">
                <CircularProgress color="secondary" sx={{marginTop: 2}} />
                <Typography variant="h6" color="primary" sx={{m: 1}}>One moment while I get that information from BoardGameGeek...</Typography>
            </Stack>
            }      
            { loading === false && top100Games && 
            <GameList games={top100Games} /> 
            }
        </>
    )

}

export default Top100Games;