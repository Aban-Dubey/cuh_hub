import express from "express";
import {getAllBlogs, addBlog, updateBlog, getBlogById, deleteBlogById, getUserBlogs, addComment, likeBlog} from "../controllers/blogControllers.js"

const blogRouter = express.Router();

//GET Routes
blogRouter.get("/all",getAllBlogs);
blogRouter.get("/getById/:id",getBlogById);
blogRouter.get("/userBlogs/:id",getUserBlogs) //here :id represent the id of the user and not of the blog because we want all the blogs for a user(identified by its id)

//POST Routes
blogRouter.post("/add",addBlog);
blogRouter.post("/comments/:blogId", addComment);
blogRouter.post("/like/:blogId", likeBlog);

//PUT Routes
blogRouter.put("/update/:id",updateBlog);

//DELETE Routes
blogRouter.delete("/delete/:id",deleteBlogById);

export default blogRouter;