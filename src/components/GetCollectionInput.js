import React from "react";
import { Stack, TextField } from "@mui/material";

function GetCollectionInput( { id, addCollectionInput, handleChange } ) {

    // // Handler for button for adding additional input fields. NOT CURRENTLY IN USE.
    // function handleClick(e) {
    //     e.preventDefault();
    //     addCollectionInput();
    // }

    return(
        <Stack>
            <TextField fullWidth variant="outlined" label="BGG Username" name={`username${id}`} onChange={handleChange} />
        </Stack>
    );
};

export default GetCollectionInput;