import React, { useContext, useEffect, useState } from "react";
import { Box, LinearProgress, Tabs, Tab, Typography } from "@mui/material";

import bouncer from "../helpers/bouncer";
import UserContext from "../context/UserContext";
import GameNightHelperAPI from "../api/gnh-api";

import UserData from "./UserData";
import GameList from "./GameList";
import UserPlaysList from "./UserPlaysList";

function UserDashboard() {

    // Access Context for user and setUser.!
    const { user, setUser } = useContext(UserContext);
    
    const [ bggUser, setBGGUser ] = useState();
    const [ currentTab, setCurrentTab ] = useState(0);
    const [ loading, setLoading ] = useState(true);

    const handleTabChange = (e, newValue) => {
        setCurrentTab(newValue);
    };

    useEffect(() => {
        async function getBGGData() {
            try {
                if (user && user.bggUsername) {
                    const bggUserData = await GameNightHelperAPI.getBGGUser(user.bggUsername);
                    setBGGUser(bggUserData);
                    if (bggUserData.userCollectionIDs.size > 0) setCurrentTab(1);
                }
                setLoading(false);
            }
            // If unsuccessful, reset form and indicate failure for process message.
            catch(err) {
                console.error(err);
                setLoading(false);
            }
        }
        getBGGData();
    }, [user]);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    const tabStyles = {
        pl: 1,
        mt: 1, 
        "& button": {
            borderStyle: "solid",
            borderTopLeftRadius: "6px",
            borderTopRightRadius: "6px",
            borderColor: "main.primary",
            borderWidth: "2px",
            borderBottom: "0px"
        }
    }

    const tabIndicatorStyles = {
        height: "0px"
    }

    return(
        <>
        { loading === true && 
             <LinearProgress color="secondary" sx={{marginTop: 2}} />
        }     
        {loading === false && 
        <div>
            <Tabs TabIndicatorProps={{sx: tabIndicatorStyles}} sx={tabStyles} value={currentTab} onChange={handleTabChange}>
                <Tab label="User Data" />
                <Tab label="Collection" />
                <Tab label="Logged Plays" />
            </Tabs>

            <Box sx={{
                borderStyle: "solid", 
                borderColor: "primary.main", 
                borderRadius: "6px",
                padding: 1, 
            }}>
                {/* USER DATA TAB */}
                { currentTab === 0 && 
                <div className="section">
                    <UserData user={user} bggUser={bggUser} />
                </div>
                }

                {/* GAME COLLECTION TAB */}
                { currentTab === 1 && 
                <div className="section">
                    {!bggUser && 
                    <Typography>You must add a valid BGG username to your account settings to use this feature.</Typography>
                    }
                    {bggUser && bggUser.userCollectionIDs.size === 0 && 
                    <Typography>Your BGG user account has no games marked "owned".</Typography>
                    }                    
                    {bggUser && bggUser.userCollectionIDs.size > 0 && 
                    <GameList games={bggUser.userGames.filter(g => bggUser.userCollectionIDs.has(g._attributes.id))} />
                    }
                </div>
                }

                {/* LOGGED PLAYS TAB */}
                { currentTab === 2 && 
                <div className="section">
                    {!bggUser && 
                    <Typography>You must add a valid BGG username to your account settings to use this feature.</Typography>
                    }
                    {bggUser && bggUser.userPlays._attributes.total === "0" && 
                    <Typography>Your BGG user account has no logged plays.</Typography>
                    }
                    {bggUser && bggUser.userPlays._attributes.total !== "0" &&  bggUser.userPlays && 
                    <UserPlaysList bggUser={bggUser}/>
                    }     
                </div>
                }

            </Box>
        </div>}
        </>
    )
};

export default UserDashboard;