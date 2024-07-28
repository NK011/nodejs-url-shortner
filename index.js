const express = require("express");
const cookieParser = require("cookie-parser");
const PORT = 8000;
const app = express();
const urlRoutes = require("./routes/urls.js");
const staticRoutes = require("./routes/statucRoutes.js");
const userRoutes = require("./routes/users");

const { connectToMongoDB } = require("./connect.js");
const { forceAuthenticate, authenticate } = require("./middlewares/auth.js");

// connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// views
app.set("view engine", "ejs");
app.set("views", "./views");

// routes
app.use("/api/url", forceAuthenticate, urlRoutes);
app.use("/", authenticate, staticRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log("Server listening on port " + PORT));
