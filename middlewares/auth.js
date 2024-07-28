const USERS = require("../models/users");
const { getUserFromSession, getUserFromToken } = require("../services/auth");

const forceAuthenticate = (req, res, next) => {
    try {
        const sessionId = req.cookies?.userCookie;
        const token = req.cookies?.userCookie;

        if (!sessionId) res.redirect("/user/login");

        // Stateful authentication
        // const user = getUserFromSession(sessionId);

        // Stateless authentication
        const user = getUserFromToken(token);

        if (!user) return res.redirect("/user/login");

        const validUser = USERS.findOne(user);

        if (!validUser) return res.redirect("/user/login");

        req.user = user;
    } catch (err) {
        console.log(err);
        res.redirect("/user/login");
        return null;
    }
    next();
};

const authenticate = (req, res, next) => {
    try {
        const sessionId = req.cookies?.userCookie;
        const token = req.cookies?.userCookie;

        // Stateful authentication
        // const user = getUserFromSession(sessionId);

        // Stateless authentication
        const user = getUserFromToken(token);
        if (!user) return res.redirect("/user/login");

        req.user = user;
    } catch (err) {
        console.log(err);
        return null;
    }
    next();
};

module.exports = {
    forceAuthenticate,
    authenticate,
};
