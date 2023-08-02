import React from "react";

import UserPlayCard from "./UserPlayCard";

function UserPlaysList( { plays } ) {

    return(
        <div className="UserPlaysList">
            <h2>Logged Plays</h2>
            {plays.map(p => <UserPlayCard play={p} key={p._attributes.id} />)}
        </div>
    );
};

export default UserPlaysList;