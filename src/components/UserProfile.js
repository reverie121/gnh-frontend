import React, { useContext, useEffect, useState } from "react";

import bouncer from "../helpers/bouncer";
import UserContext from "../context/UserContext";
import GameListContext from "../context/GameListContext";
import { gameListToLocal } from "../helpers/localStorageHelper";
import GameNightHelperAPI from "../api/gnh-api";

import GameList from "./GameList";
import UserPlaysList from "./UserPlaysList";

import '../css/UserProfile.css';

function UserProfile() {

    // Access Context for user and setUser.
    const { user, setUser } = useContext(UserContext);
    const { gameList, setGameList } = useContext(GameListContext);

    const [ bggUser, setBGGUser ] = useState();

    useEffect(() => {
        async function getBGGData() {
            if (user && user.bggUsername) {
                const bggUserData = await GameNightHelperAPI.getBGGUser(user.bggUsername);
                setBGGUser(bggUserData);
            }
        }
        getBGGData();
    }, [user]);

    useEffect(() => {
        if (bggUser && bggUser.userGames) {
            const collectionGameList = bggUser.userGames.filter(g => bggUser.userCollectionIDs.includes(g._attributes.id))
            gameListToLocal(collectionGameList);
            setGameList(collectionGameList);
        }
    }, [bggUser, setGameList]);

    // Call the bouncer.
    let b = bouncer(user, setUser);
    if (b) return b;

    return(
        <div className="UserProfile">
            <div className="detailsBox">
                <div className="userDetails">
                    <div className="detailsRow">
                        <div className="detailsLabel">Username:</div>
                        <div className="detailsData">{user.username}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsLabel">Name:</div>
                        <div className="detailsData">{user.firstName} {user.lastName}</div>
                    </div>
                    <div className="detailsRow">
                        <div className="detailsLabel">Email:</div>
                        <div className="detailsData">{user.email}</div>
                    </div>
                </div>
                {bggUser &&
                <div className="bggDetails">
                    <div className="detailsChunk">BGG Username: <a href={`https://boardgamegeek.com/user/${user.bggUsername}`} target="_blank" rel="noopener noreferrer">{user.bggUsername}</a>
                    </div>
                    {/* If BGG User data has friends... */}
                    {bggUser.userDetails.buddies._attributes.total !== "0" 
                        && 
                    <div className="detailsChunk">Buddies: 
                        {/* Case for multiple friends */}
                        {Array.isArray(bggUser.userDetails.buddies.buddy)
                        && 
                        bggUser.userDetails.buddies.buddy.map((b, i) => 
                            <span key={b._attributes.name}> <a href={`https://boardgamegeek.com/user/${b._attributes.name}`} target="_blank" rel="noopener noreferrer">
                                {b._attributes.name}{i+1 < bggUser.userDetails.buddies.buddy.length && ","}
                            </a></span>
                        )}
                        {/* Case for a single friend */}
                        {!Array.isArray(bggUser.userDetails.buddies.buddy)
                        && 
                        <span> <a href={`https://boardgamegeek.com/user/${bggUser.userDetails.buddies.buddy._attributes.name}`} target="_blank" rel="noopener noreferrer">
                            {bggUser.userDetails.buddies.buddy._attributes.name}
                        </a></span>
                        }                        
                    </div>}
                    {/* If BGG User data has guilds... */}                    
                    {bggUser.userDetails.guilds._attributes.total !== "0" 
                    && 
                    <div className="detailsChunk">Guilds: 
                        {/* Case for multiple guilds */}
                        {Array.isArray(bggUser.userDetails.guilds.guild)
                        && 
                        bggUser.userDetails.guilds.guild.map((g, i) => 
                            <span key={g._attributes.name}> <a href={`https://boardgamegeek.com/guild/${g._attributes.id}`} target="_blank" rel="noopener noreferrer">
                                {g._attributes.name}{i+1 < bggUser.userDetails.guilds.guild.length && ","}
                            </a></span>
                        )}
                        {/* Case for a single guild */}     
                        {!Array.isArray(bggUser.userDetails.guilds.guild)
                        && 
                        <span> <a href={`https://boardgamegeek.com/guild/${bggUser.userDetails.guilds.guild._attributes.id}`} target="_blank" rel="noopener noreferrer">
                                {bggUser.userDetails.guilds.guild._attributes.name}
                        </a></span>
                        }                   
                    </div>}
                </div>
                }
            </div>
            {gameList && bggUser && bggUser.userCollectionIDs && 
            <div className="userCollection">
                <h2>Game Collection</h2>
                <GameList />
            </div>
            }
            {bggUser 
            && 
            bggUser.userPlays._attributes.total !== "0"
            && 
            bggUser.userPlays && <UserPlaysList plays={bggUser.userPlays.play}/>
            }         
        </div>
    )
};

export default UserProfile;