import React from "react";
import { Box } from "@mui/material";

import ThemedButton from "./themed-components/ThemedButton";

import '../css/GetCollectionInput.css';

function GetCollectionInput( { id, addCollectionInput, handleChange } ) {
    
    function handleClick(e) {
        e.preventDefault();
        addCollectionInput();
    }

    return(
        <Box className="getCollectionInput">
            <label htmlFor={`username${id}`} />
            <input name={`username${id}`} 
                id={`username${id}`} 
                type="text" 
                placeholder="BGG Username"
                onChange={handleChange} 
            />
            {id !== "1" && 
                <ThemedButton onClick={handleClick} text="+" />
            }
        </Box>
    );
};

export default GetCollectionInput;