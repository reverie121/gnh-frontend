import React, {useState} from 'react';

import Nav from './Nav';
import Routes from './Routes';

import UserContext from './UserContext';

import './css/App.css';

function App() {

    // Create user state for UserContext so that it may be accessed easily from any component.
    const [user, setUser] = useState();

    return (
        <div className="App">
            <UserContext.Provider value={{ user, setUser }}>
                <Nav />
                <div className="PageContent">
                    <Routes />
                </div>
            </UserContext.Provider>
        </div>
    );
}

export default App;
