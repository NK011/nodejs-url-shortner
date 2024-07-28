// Stateful authentication
const userSessionIdMap = new Map();

const setUserSession = (sessionId, user) => {
    userSessionIdMap.set(sessionId, user);
};

const getUserFromSession = (sessionId) => {
    return userSessionIdMap.get(sessionId);
};

// Stateless authentication
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Nitish@JWT11";

const setUserToken = (user) => {
    try {
        return jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            JWT_SECRET
        );
    } catch (e) {
        console.log("Error is this ", e);
        return null;
    }
};

const getUserFromToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        console.log(e);
        return null;
    }
};

module.exports = {
    setUserSession,
    getUserFromSession,
    setUserToken,
    getUserFromToken,
};
