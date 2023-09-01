// Displays a list of logged plays.

import React from "react";

import { Container } from "@mui/material";

import UserPlayCard from "./UserPlayCard";

function UserPlaysList( { bggUser } ) {

    const plays = bggUser.userPlays.play;

    return(
        <Container className="UserPlaysList">
            {plays.map(p => <UserPlayCard play={p} key={p._attributes.id} thumbnail={bggUser.userPlays.thumbnailURLs[p.item._attributes.objectid]} />)}
        </Container>
    );
};

export default UserPlaysList;