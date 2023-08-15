// Gets site (not BGG) user data via get request.

import GameNightHelperAPI from "../api/gnh-api";

const getUserData = async (username, setUser) => {
    console.debug(`Getting data for user ${username}.`)
    let res = await GameNightHelperAPI.getUser(username);
    setUser({...res})
}

export default getUserData;