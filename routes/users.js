const express = require("express");

const { handleUserSignUp, handleUserLogin } = require("../controllers/users");
const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);

module.exports = router;