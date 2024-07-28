const mongoose = require("mongoose");

const connectToMongoDB = (url) => {
    return mongoose
        .connect(url)
        .then(() => console.log("Connected to MongoDB successfully!!"))
        .catch((err) => console.log("Oops!, some error happened" + err));
};

module.exports = {
    connectToMongoDB
}