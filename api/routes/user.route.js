import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { deleteUser, getUser, updateUser, getUserBlogs } from '../controllers/user.controller.js';

const router = express.Router();

router.get(`/:id`, verifyUser, getUser);
router.get(`/blogs/:id`, verifyUser, getUserBlogs);
router.post(`/update/:id`, verifyUser, updateUser);
router.delete(`/delete/:id`, verifyUser, deleteUser);
export default router;