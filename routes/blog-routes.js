import express from "express";
import { addBlog, deleteBlogById, getAllBlogs, getBlogById, updateBlog, userBlogs } from "../controllers/blog-controller";
const router = express.Router();

router.post("/addblog", addBlog);
router.get("/allblog", getAllBlogs);
router.put("/update/:id", updateBlog);
router.get("/blog/:id", getBlogById);
router.delete("/delete/:id", deleteBlogById);
router.get("/user/blogs/:id", userBlogs);

export default router;