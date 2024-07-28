const shortid = require("shortid");
const URLS = require("../models/urls");

const handleCreateShortUrl = async (req, res) => {
    try {
        if (!req.body)
            return res.status(404).json({
                url: "This key is required",
            });

        const url = req.body.url;
        const user = req.user;
        const shortId = shortid.generate();
        const shortUrl = await URLS.create({
            shortId: shortId,
            url: url,
            visits: [{}],
            createdBy: user._id,
        });

        return res.render("home", {
            shortId: shortId,
        });

        return res.status(200).json({
            id: shortId,
        });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const handleGetShortUrl = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URLS.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visits: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.url);
};

module.exports = {
    handleCreateShortUrl,
    handleGetShortUrl,
};
