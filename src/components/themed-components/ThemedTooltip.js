import React from "react";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const ThemedTooltip = ({ contents }) => {

    return(
        <Tooltip arrow color="secondary" fontSize="small" 
        sx = {{
            ml: "1px"
        }}
        title={contents}>
            <HelpOutlineIcon />
        </Tooltip>
    )
}

export default ThemedTooltip;