import express from "express";
import { Site } from "../../../models/index.js";
import siteReviewsRouter from "./siteReviewsRouter.js"

const sitesRouter = new express.Router();

sitesRouter.get("/", async (req, res) => {
    try {
        const sites = await Site.query();
        return res.status(200).json({ siteList: sites });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const site = await Site.query().findById(id);
        site.reviews = await site.$relatedQuery("reviews")
        return res.status(200).json({ site: site });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

sitesRouter.use("/:id/review-form", siteReviewsRouter)
