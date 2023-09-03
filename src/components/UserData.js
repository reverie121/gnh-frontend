// Displays user data.

import React from "react";
import { Box, Container } from "@mui/material";

function UserData( { user, bggUser } ) {

    const styles = {
        mt: 1
    }

    return(
        <>
        <div>
            <Container sx={styles}>
                Username: {user.username}
            </Container>
            <Container sx={styles}>
                Name: {user.firstName} {user.lastName}
            </Container>
            <Container sx={styles}>
                Email: {user.email}
            </Container>
        </div>

        <hr />

        {bggUser &&
        <Box sx={styles}>
            <Container sx={styles}>BGG Username: <a href={`https://boardgamegeek.com/user/${user.bggUsername}`} target="_blank" rel="noopener noreferrer">{user.bggUsername}</a>
            </Container>
            {/* If BGG User data has friends... */}
            {bggUser.userDetails.buddies._attributes.total !== "0" 
                && 
            <Container sx={styles}>Buddies: 
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
            </Container>}
            {/* If BGG User data has guilds... */}                    
            {bggUser.userDetails.guilds._attributes.total !== "0" 
            && 
            <Container sx={styles}>Guilds: 
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
            </Container>}
        </Box>
    }
    </>

    );
};

export default UserData;