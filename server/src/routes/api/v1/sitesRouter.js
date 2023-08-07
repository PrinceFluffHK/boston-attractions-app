import express from "express";
import uploadImage from "../../../services/uploadImage.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Site } from "../../../models/index.js";
import { ValidationError } from "objection";

const sitesRouter = new express.Router();

sitesRouter.get("/", async (req, res) => {
    try {
        const sites = await Site.query();
        return res.status(200).json({ siteList: sites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.post("/", uploadImage.single("image"), async (req, res) => {
    try {
        const { body } = req;
        const formInput = cleanUserInput(body);
        const data = {
            ...formInput,
            image: req.file.location,
        };
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
