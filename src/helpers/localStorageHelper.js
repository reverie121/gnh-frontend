function userToLocal(t, u) {
    localStorage.setItem("token", t);
    localStorage.setItem("username", u);
}

function userFromLocal() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return { token, username };
}

function userClearLocal() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
}

function gameListToLocal(gamelist) {
    localStorage.setItem("gamelist", JSON.stringify(gamelist));
}

function gameListFromLocal() {
    if (localStorage.getItem("gamelist") !== undefined) {
        const gamelist = localStorage.getItem("gamelist");
        return JSON.parse(gamelist);
    };
}

function gameListClearLocal() {
    localStorage.removeItem("gamelist");
}

export { userToLocal, userFromLocal, userClearLocal, gameListToLocal, gameListFromLocal, gameListClearLocal };