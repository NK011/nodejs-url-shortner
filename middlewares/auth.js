const USERS = require("../models/users");
const { getUserFromSession, getUserFromToken } = require("../services/auth");

const forceAuthenticate = (req, res, next) => {
    try {
        const sessionId = req.cookies?.token;
        const token = req.cookies?.token;

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
        const sessionId = req.cookies?.token;
        const token = req.cookies?.token;

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

// refactored above code
const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token;
    req.user = null;

    if (!token) return next();

    const user = getUserFromToken(token);
    req.user = user;

    return next();
};

const checkPermission = (authorizedRoles = []) => {
    return function (req, res, next) {
        const token = req.cookies?.token;
        if (!token) return res.redirect("/user/login");

        const user = getUserFromToken(token);

        if (!authorizedRoles.includes(user.role))
            return res.status(403).json("Access Denied");

        next();
    };
};

module.exports = {
    forceAuthenticate,
    authenticate,

    // new authentication middlewares
    authenticateUser,
    checkPermission,
};
