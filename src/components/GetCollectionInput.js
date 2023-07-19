import React from "react";

function GetCollectionInput( { id, handleChange } ) {
    return(
        <div>
            <label  />
            <input name={`username${id}`} 
                id={`username${id}`} 
                type="text" 
                placeholder="BGG Username"
                onChange={handleChange} 
            />
        </div>
    );
};

export default GetCollectionInput;