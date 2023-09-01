import React, {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Box } from "@mui/material";

import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

import UserContext from './context/UserContext';
import GameListContext from './context/GameListContext';

import './css/App.css';

function App() {

    // Create user state for UserContext so that it may be accessed easily from any component.
    const [user, setUser] = useState();

    const [gameList, setGameList] = useState();

    const theme = createTheme({
        palette: {
            primary: {
                main: "#4B0082",
                light: "#663399",
                dark: "#1F0954",
                contrastText: '#fff'
            },
            secondary: {
                main: "#48D1CC",
                light: "#00FFFF",
                dark: "#00CED1",
                contrastText: '#1F0954'
            }
        }, 
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "secondary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                            backgroundColor: "secondary.light",
                            color: "secondary.contrastText",
                        }                            
                    }
                }
            }
        },
        typography: {
            fontFamily: [
                'Trebuchet MS', 'Gill Sans', 'Gill Sans MT', 'Calibri'
            ].join(',')
        }        
    })

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Box className="App">
                    <UserContext.Provider value={{ user, setUser }}>
                        <Nav />
                        {/* The PageContent class is setting the width of all content below the nav. */}
                        <Box className="PageContent">
                            <GameListContext.Provider value={{ gameList, setGameList }}>
                                <AppRoutes />
                            </GameListContext.Provider>
                        </Box>
                    </UserContext.Provider>
                </Box>
            </ThemeProvider>
        </BrowserRouter>

    );
}

export default App;
