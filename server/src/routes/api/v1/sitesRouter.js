import express from "express";
import { Site } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
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

sitesRouter.post("/", async (req, res) => {
    const { body } = req
    const formInput = cleanUserInput(body)
    try {
        const newSite = await Site.query().insertAndFetch(formInput)
        return res.status(201).json({ site: newSite })
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.data })
        }
        return res.status(500).json({ errors: error })
    }
})

sitesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const site = await Site.query().findById(id);
        return res.status(200).json({ site: site });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
});

export default sitesRouter;
