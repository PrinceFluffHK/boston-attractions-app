import express from "express";
import uploadImage from "../../../services/uploadImage.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Site } from "../../../models/index.js";
import { ValidationError } from "objection";

const sitesRouter = new express.Router();

sitesRouter.get("/", async (req, res) => {
    try {
        const sites = await Site.query();
        const creator = await Site.query().$relatedQuery("users")
        console.log(creator)
        return res.status(200).json({ siteList: sites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.post("/", uploadImage.single("image"), async (req, res) => {
    try {
        const { body } = req;
        // console.log(req.file.location)
        const formInput = cleanUserInput(body);
        let data
        if (req.file) {
            data = {
                ...formInput,
                image: req.file.location,
            };
        } else {
            data = {
                ...formInput,
                image: "https://static.displate.com/857x1200/displate/2020-03-12/c47b057f270b9101cfb4d462279d38b3_7477322f46cfe492f40beb04fe6d42ff.jpg",
            };
        }
        const newSite = await Site.query().insertAndFetch(data);
        return res.status(201).json({ site: newSite });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.data });
        }
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const site = await Site.query().findById(id);
        site.reviews = await site.$relatedQuery("reviews");
        return res.status(200).json({ site: site });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default sitesRouter;
