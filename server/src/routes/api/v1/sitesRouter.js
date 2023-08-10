import express from "express";
import uploadImage from "../../../services/uploadImage.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Site } from "../../../models/index.js";
import siteReviewsRouter from "./siteReviewsRouter.js"
import { ValidationError } from "objection";
import SiteSerializer from "../../../serializers/SiteSerializer.js"

const sitesRouter = new express.Router();

sitesRouter.get("/", async (req, res) => {
    try {
        const sites = await Site.query();
        const serializedSites = SiteSerializer.getSummary(sites)

        return res.status(200).json({ siteList: serializedSites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.post("/", uploadImage.single("image"), async (req, res) => {
    try {
        const { body, user } = req;
        const formInput = cleanUserInput(body);

        const data = {
            ...formInput,
            image: req.file?.location,
            creatorId: user.id
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
    const { id } = req.params;
    try {
        const site = await Site.query().findById(id);
        const serializedSite = await SiteSerializer.getInfo(site, req.user)
        return res.status(200).json({ site: serializedSite });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.use("/:siteId/reviews", siteReviewsRouter)

export default sitesRouter;