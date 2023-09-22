import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import ThemedButton from "./components/themed-components/ThemedButton";

function Home() {

    return(
        <Box sx={{
            marginTop: ".5rem",
            minHeight: "calc(100vh - 20rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Stack direction="row" alignItems="baseline" sx={{color: "primary.main"}}>

            <Typography variant="h1" sx={{
                fontSize: "3rem",
                fontFamily: "monospace"
            }}>G</Typography>
            <Typography variant="h1" sx={{
                fontSize: "2rem",
            }}>AME</Typography>

            <Typography variant="h1" ml={2} sx={{
                fontSize: "3rem",
                fontFamily: "monospace"
            }}>N</Typography>                                                
            <Typography variant="h1" sx={{
                fontSize: "2rem",
            }}>IGHT</Typography>

            <Typography variant="h1" ml={2} sx={{
                fontSize: "3rem",
                fontFamily: "monospace"
            }}>H</Typography>                                                
            <Typography variant="h1" sx={{
                fontSize: "2rem",
            }}>ELPER</Typography>

            </Stack>

            <Typography variant="h5" color="secondary.dark" sx={{m: 1}}>Time to choose a game? I can help.</Typography>
            <Typography mt={2}>To access the sites full suite of features, please log in or sign up.</Typography>
            <div>
                <Link to="/login">
                    <ThemedButton text="Log In" />
                </Link>
                <Link to="/signup">
                    <ThemedButton text="Sign Up" />
                </Link>
            </div>

            <Box mt={2} p={1.5} sx={{
                minWidth: {
                    xs: "250px", // 0 - 559 px
                    sm: "400px", // 600 - 889 px
                    md: "500px", // 900 - 1199 px
                    lg: "700px", // 1200 - 1535 px
                    xl: "800px" // 1536+ px
                }, 
                backgroundColor: "primary.transparent",
                borderRadius: "4px"
            }}>
                <Typography sx={{textAlign: "center"}}>Or enjoy these features without an account:</Typography>
                <Typography mt={1}>
                    <Link to="./collectionbrowser">Collection Browser</Link> - Input a Boardgame Geek username to browse the user's collection of games.
                </Typography>
                <Typography mt={1}>
                    <Link to="./top100">Top 100</Link> - View the 100 highest ranked boardgames on Boardgame Geek.
                </Typography>
                <Typography mt={1}>
                    <Link to="./hot50">Hot 50</Link> - View the 50 most active boardgames on Boardgame Geek.
                </Typography>                
            </Box>
        </Box>
    )
}

export default Home;