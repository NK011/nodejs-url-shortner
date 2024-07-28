const express = require("express");
const routes = express.Router();
const { handleCreateShortUrl, handleGetShortUrl } = require("../controllers/urls");

routes.post("/", handleCreateShortUrl);
routes.get("/:shortId", handleGetShortUrl)

module.exports = routes;
