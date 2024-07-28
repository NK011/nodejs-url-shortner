const USERS = require("../models/users");
const { v4: uuidV4 } = require("uuid");
const { setUserSession, setUserToken } = require("../services/auth");

const handleUserSignUp = async (req, res) => {
    try {
        const user = await USERS.create({
            ...req.body,
        });

        return res.redirect("/user/login");
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await USERS.findOne({
            email: email,
            password: password,
        });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Stateful Authentication
        // const sessionId = uuidV4();
        // setUserSession(sessionId, user);
        // res.cookie("userCookie", sessionId);


        // Stateless Authentication
        const token = setUserToken(user);
        res.cookie("token", token);
        return res.redirect("/");
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
    handleUserSignUp,
    handleUserLogin,
};
