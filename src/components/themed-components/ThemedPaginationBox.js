import React from "react";

import { Box, Pagination } from "@mui/material";


function PaginationBox({ page, numberOfPages, handlePageChange }) {

    return (
        <Box sx={{
            m: 1, 
            p: 1, 
            display: "flex", 
            flexDirection: "column", 
            justifyContent: "center", 
            alignItems: "center", 
            textAlign: "center", 
            color: "primary.main", 
            borderStyle: "solid", 
            borderWidth: "2px",
            borderRadius: "3px", 
            borderColor: "primary.main"
        }}>
            <Pagination color="secondary" count={numberOfPages} onChange={handlePageChange} page={page} />
        </Box>      
    )
}

export default PaginationBox;