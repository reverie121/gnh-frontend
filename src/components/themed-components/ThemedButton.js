import React from "react";
import { Button } from "@mui/material";

const ThemedButton = ({ onClick, text }) => {
    
    return(
        <Button
            variant="contained"           
            sx={{
                margin: "4px", 
                backgroundColor: "primary.main",
                color: "primary.contrastText",
                "&:hover": {
                    backgroundColor: "secondary.light",
                    color: "secondary.contrastText",                
                },   
                transition: "0.3s ease-in-out"
            }} 
            onClick={onClick}
        >
            {text}
        </Button>
    )
}

export default ThemedButton;