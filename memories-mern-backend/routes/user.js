import express from "express";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router
    .post('/signin', signin)
    .post('/signup', signup)

export default router;