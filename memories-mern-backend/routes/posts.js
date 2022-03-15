import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router();

router
    .get('/', getPosts)
    .post('/', createPost)
    .patch('/:id', updatePost)
    .delete('/:id', deletePost)
    .patch('/:id/likePost', likePost);

export default router;