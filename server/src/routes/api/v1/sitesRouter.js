import express from "express";
import objection from "objection";
import { Site } from "../../../models/index.js"

const sitesRouter = new express.Router()

sitesRouter.get("/", async (req, res) => {
    try {
        const sites = await Site.query()
        console.log(sites)
        return res.status(200).json({ siteList: sites })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default sitesRouter