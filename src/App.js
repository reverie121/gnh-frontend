import React, {useState} from 'react';

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

    return (
        <BrowserRouter>
            <div className="App">
                <UserContext.Provider value={{ user, setUser }}>
                    <Nav />
                    <div className="PageContent">
                        <GameListContext.Provider value={{ gameList, setGameList }}>
                            <AppRoutes />
                        </GameListContext.Provider>
                    </div>
                </UserContext.Provider>
            </div>
        </BrowserRouter>

    );
}

export default App;
