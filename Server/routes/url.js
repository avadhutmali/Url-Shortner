const express = require("express");
const shortid = require("shortid");
const url = require("../models/url");
const user = require("../models/user");

const router = express.Router();

router  
    .route("/generateShortUrl")
    .post(async (req, res) => {
        let { redireUrl, userName } = req.body;

        // Validate `redireUrl`
        if (!redireUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        if (!redireUrl.startsWith("http://") && !redireUrl.startsWith("https://")) {
            redireUrl = `https://${redireUrl}`;
        }

        try {
            // Generate a short ID
            const shortId = shortid.generate();

            // Create a new URL document
            const newUrl = await url.create({
                redireUrl,
                shortId,
                visitHistory: []
            });

            // Find the user by userName
            const User = await user.findOne({ userName });
            if (!User) {
                return res.status(404).json({ error: "User not found" });
            }
            // Add the URL to the user's `urls` array
            User.urls.push(newUrl._id);
            await User.save();

            return res.status(201).json({ id: shortId });
        } catch (error) {
            console.error("Error generating short URL:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

router.get("/:shortid", async (req, res) => {
    try {
        const shortId = req.params.shortid;

        // Find the URL by `shortId` and update visitHistory
        const entry = await url.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true } // Return the updated document
        );

        if (entry) {
            return res.redirect(entry.redireUrl);
        } else {
            return res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        console.error("Error resolving short URL:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
