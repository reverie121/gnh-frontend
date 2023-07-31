import React from "react";

import { bggUserFromLocal } from "../helpers/localStorageHelper";

import '../css/UserPlayCard.css';

function UserPlayCard( { play } ) {
    const bggUser = bggUserFromLocal();

    const src = bggUser.userGames.filter(g => play.item._attributes.objectid === g._attributes.id)[0].thumbnail._text;

    return(
        <div className="UserPlayCard">
            <div className="TitleBar"><h4>{play._attributes.date}</h4></div>
            <div className="BoxContainer">
                <div className="LeftBox">
                    <img src={src} alt={play.item._attributes.name} />
                </div>
                <div className="RightBox">
                    <div className="GameTitle"><h4>{play.item._attributes.name}</h4></div>
                    {play._attributes.quantity &&
                        <div>Plays: {play._attributes.quantity}</div> }
                    {play._attributes.location &&
                        <div>Location: {play._attributes.location}</div> }
                    {play.comments && 
                        <div>Comment: {play.comments._text}</div> }
                </div>
            </div>
        </div>
    );
};

export default UserPlayCard;