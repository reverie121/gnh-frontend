// Displays data for a BGG user's Logged Play.

import React from "react";

import '../css/UserPlayCard.css';

function UserPlayCard( { play, thumbnail } ) {

    const src = thumbnail === undefined || thumbnail === "no image available" ? "/img/no_thumbnail.jpg" : thumbnail;

    return(
        <div className="UserPlayCard">
            <div className="TitleBar"><h4>{play._attributes.date}</h4></div>
            <div className="BoxContainer">
                <div className="LeftBox">
                    <img className="Thumbnail" src={src} alt={play.item._attributes.name} />
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