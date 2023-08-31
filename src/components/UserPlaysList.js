// Displays a list of logged plays.

import React from "react";

import UserPlayCard from "./UserPlayCard";

function UserPlaysList( { bggUser } ) {

    const plays = bggUser.userPlays.play;

    return(
        <div className="UserPlaysList">
            <h2>Logged Plays</h2>
            {plays.map(p => <UserPlayCard play={p} key={p._attributes.id} thumbnail={bggUser.userPlays.thumbnailURLs[p.item._attributes.objectid]} />)}
        </div>
    );
};

export default UserPlaysList;