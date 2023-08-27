import React from "react";
import { Stack } from "@mui/material";

function GetCollectionInput( { id, addCollectionInput, handleChange } ) {

    // Handler for button for adding additional input fields. NOT CURRENTLY IN USE.
    // function handleClick(e) {
    //     e.preventDefault();
    //     addCollectionInput();
    // }

    return(
        <Stack>
            <label htmlFor={`username${id}`} />
            <input name={`username${id}`} 
                id={`username${id}`} 
                type="text" 
                placeholder="BGG Username"
                onChange={handleChange} 
            />
        </Stack>
    );
};

export default GetCollectionInput;