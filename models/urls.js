const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            unique: true,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        visits: [
            {
                timestamp: {
                    type: Number
                },
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    },
    {
        timestamps: true,
    }
);

const URLS = mongoose.model("urls", urlSchema);

module.exports = URLS;
