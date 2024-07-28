const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 8000;
const app = express();
const urlRoutes = require("./routes/urls.js");
const staticRoutes = require("./routes/statucRoutes.js");
const userRoutes = require("./routes/users");

const { connectToMongoDB } = require("./connect.js");
const {
    forceAuthenticate,
    authenticate,
    authenticateUser,
    checkPermission,
} = require("./middlewares/auth.js");

// connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner");

// views
app.set("view engine", "ejs");
app.set("views", "./views");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticateUser);


// routes
// app.use("/api/url", forceAuthenticate, urlRoutes);
app.use("/api/url", checkPermission(["NORMAL", "ADMIN"]), urlRoutes);
// app.use("/", authenticate, staticRoutes);
app.use("/", staticRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => console.log("Server listening on port " + PORT));
