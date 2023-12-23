import express from 'express';
import {createBlog, readBlog, getBlog, deleteBlog, updateBlog} from '../controllers/blog.controller.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post(`/create`, verifyUser, createBlog);
router.get(`/read`, readBlog);
router.get(`/read/:id`, verifyUser, getBlog);
router.delete('/delete/:id', verifyUser, deleteBlog);
router.post(`/update/:id`, verifyUser, updateBlog);

export default router;