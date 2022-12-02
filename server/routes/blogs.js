const router = require("express").Router();
const User = require("../model/userDbModel");
const Blogs = require("../model/Blogs");
const path = require("path");
const {validateTokenBody, validateTokenParams} = require("./JWT");

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "./blogs.html"));
})

//create new blog.
router.post("/createBlog", validateTokenBody, async (req, res) => {
    try{
    const user = await User.findById(req.body.userId);
    const blog = new Blogs({
        title: req.body.title,
        content: req.body.content,
        authorId: req.body.userId
    })
    await blog.save()
    res.status(200).json(blog);
}
catch (err) {
    res.status(500).json(err);
}
})

//get a blog by user id.
router.get("/:userId/:token", validateTokenParams, async (req, res) =>{
    try {
      const blog = await Blogs.find({authorId: req.params.userId});
      res.status(200).json(blog);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//edit a blog.
router.patch("/:blogId", validateTokenBody, async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.blogId);
        if (blog.authorId === req.body.userId) {
        await blog.updateOne({ $set: req.body });
        res.status(200).json("Blog is updated");
        }
        else {
          res.status(403).json("Blog not found!")
        }
      }
      catch (err) {
          res.status(500).json(err);
      }
})

//delete a blog.
router.delete("/:blogId/:userId/:token", validateTokenParams, async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.blogId);
        if (blog.authorId === req.params.userId) {
        await Blogs.deleteOne(blog);
        res.status(200).json("Blog is deleted");
        }
        else {
          res.status(403).json("Request failed!")
        }
      }
      catch (err) {
          res.status(500).json(err);
      }
})

//like a blog.
router.put("/:blogId", validateTokenBody, async (req, res) => {
    try {
    const blog = await Blogs.findById(req.params.blogId);
    if (!(blog.likes.includes(req.body.userId))) {
        await blog.updateOne({$push: {likes: req.body.userId}});
        res.status(200).json("Blog is liked!")
    }
    else {
        await blog.updateOne({$pull: {likes: req.body.userId}});
        res.status(200).json("Blog is disliked!")
    }
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;