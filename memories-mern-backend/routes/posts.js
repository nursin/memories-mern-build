import express from "express";
import { getPosts, createPost, updatePost, deletePost } from "../controllers/posts.js";

const router = express.Router();

router
    .get('/', getPosts)
    .post('/', createPost)
    .patch('/:id', updatePost)
    .delete('/:id', deletePost);

export default router;