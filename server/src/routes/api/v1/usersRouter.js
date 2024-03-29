import express from "express";
import passport from "passport";
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js";
const { ValidationError } = objection
import { User } from "../../../models/index.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const {body} = req
  const formInput = cleanUserInput(body)
  const { username, firstName, lastName, email, password, passwordConfirmation } = formInput;
  try {
    const persistedUser = await User.query().insertAndFetch({ username, firstName, lastName, email, password });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;