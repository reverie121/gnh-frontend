function toLocal(t, u) {
    localStorage.setItem("token", t);
    localStorage.setItem("username", u);
}

function fromLocal() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return { token, username };
}

function clearLocal() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
}

// export { toLocal, fromLocal, clearLocal };
export { toLocal, fromLocal, clearLocal };