import React, {useState} from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from "@mui/material";

import Nav from './Nav';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

import UserContext from './context/UserContext';
import GameListContext from './context/GameListContext';

import theme from './Theme';
import './css/App.css';

function App() {

    // Create user state for UserContext so that it may be accessed easily from any component.
    const [user, setUser] = useState();

    const [gameList, setGameList] = useState();

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
