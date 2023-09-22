import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Container, Link, Stack, Typography } from "@mui/material";

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

            <Typography variant="h6" color="primary.dark" mt={2}>What is Game Night Helper?</Typography>
            <Container sx={{
                marginTop: 1, 
                padding: 1.5, 
                backgroundColor: "secondary.transparent",
                borderRadius: "4px"
            }}>
                <Typography>
                    Game Night Helper is a tool for users of the website <Link href="https://boardgamegeek.com/">BoardGame Geek</Link>, and their friends. It is an enhanced browsing tool with an updated user interface, ideal for viewing a user's game collection or just seeing what games are popular right now.
                </Typography>
            </Container>

            <Typography mt={2}>To access the sites full suite of features, please log in or sign up.</Typography>
            <div>
                <Link to="/login">
                    <ThemedButton text="Log In" />
                </Link>
                <Link to="/signup">
                    <ThemedButton text="Sign Up" />
                </Link>
            </div>

            <Container sx={{
                marginTop: 2, 
                padding: 1.5, 
                backgroundColor: "primary.transparent",
                borderRadius: "4px"
            }}>
                <Typography sx={{textAlign: "center"}}>Or enjoy these features without an account:</Typography>
                <Typography mt={1}>
                    <Link to="./collectionbrowser"  underline="none" component={RouterLink} sx={{
                    "&:hover": {
                        color: "secondary.main",
                    }                             
                    }}>Collection Browser</Link> - Input a BoardGame Geek username to browse the user's collection of games.
                </Typography>
                <Typography mt={1}>
                    <Link to="./top100"  underline="none" component={RouterLink} sx={{
                    "&:hover": {
                        color: "secondary.main",
                    }                             
                    }}>Top 100</Link> - View the 100 highest ranked board games on BoardGame Geek.
                </Typography>
                <Typography mt={1}>
                    <Link to="./hot50"  underline="none" component={RouterLink} sx={{
                    "&:hover": {
                        color: "secondary.main",
                    }                             
                    }}>Hot 50</Link> - View the 50 most active board games on BoardGame Geek.
                </Typography>                
            </Container>
        </Box>
    )
}

export default Home;