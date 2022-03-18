import express from "express";
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router
    .get('/search', getPostsBySearch)
    .get('/', getPosts)
    .post('/', createPost)
    .patch('/:id', auth, updatePost)
    .delete('/:id', auth, deletePost)
    .patch('/:id/likePost', auth, likePost);

export default router;