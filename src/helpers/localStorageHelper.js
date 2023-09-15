// Helper for all localStorage interactions.

// USER
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

// BGG USER
function bggUserToLocal(bggUser) {
    localStorage.setItem("bgguser", JSON.stringify(bggUser));
}

function bggUserFromLocal() {
    if (localStorage.getItem("bgguser") !== undefined) {
        const bgguserData = localStorage.getItem("bgguser");
        return JSON.parse(bgguserData);
    };
}

function bggUserClearLocal() {
    localStorage.removeItem("bgguser");
}

export { userToLocal, userFromLocal, userClearLocal, bggUserToLocal, bggUserFromLocal, bggUserClearLocal };