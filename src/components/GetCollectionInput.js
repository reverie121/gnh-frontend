import React from "react";

import '../css/GetCollectionInput.css';

function GetCollectionInput( { id, addCollectionInput, handleChange } ) {
    
    function handleClick(e) {
        e.preventDefault();
        addCollectionInput();
    }

    return(
        <div className="getCollectionInput">
            <label htmlFor={`username${id}`} />
            <input name={`username${id}`} 
                id={`username${id}`} 
                type="text" 
                placeholder="BGG Username"
                onChange={handleChange} 
            />
            {id !== "1" && <button className="addCollectionInputButton" onClick={handleClick}>+</button>}
        </div>
    );
};

export default GetCollectionInput;