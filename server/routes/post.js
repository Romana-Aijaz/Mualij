const router = require("express").Router();
const Post = require("../model/postsModel");
const User = require("../model/userDbModel");
const path = require("path");
const Notification = require("../model/Notification")
const {createTokens, validateTokenBody, validateTokenParams} = require("./JWT");

router.get("/", (req, res) => {
  const  posts = [
      {
        id: 1,
        title: "postOne",
        body: "post one",
        publishedAt: "10-01-2020"
      },
      {
        id: 2,
        title: "postTwo",
        body: "post two",
        publishedAt: "10-01-2020"
      },
      {
        id: 3,
        title: "postThree",
        body: "post three",
        publishedAt: "10-01-2020"
      }
    ]
    res.header('Content-Range', 'posts 0-20/20');
    res.send(posts);
});

//creating a post
router.post("/createPost", validateTokenBody  , async (req, res) => {
  console.log(req.body)
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//updating a post
router.patch("/:postId", validateTokenBody, async (req, res) => {
  console.log(req.body);
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You are not allowed to update this post.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//deleting a post
router.delete("/:postId/:userId/:token", validateTokenParams, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.params.userId) {
      const notification = await Notification.find({postId: post._id.toString()})
      if (notification) {
        await Notification.deleteMany({postId: post._id.toString()})
      }
      await Post.findByIdAndDelete(req.params.postId);
      res.status(200).json("Post deleted successfully!");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like a post.
router.post("/like", validateTokenBody , async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      const newNotification = new Notification({
        senderId: req.body.userId,
        receiverId: post.userId,
        postId: post._id.toString(),
        notificationType: 1
      });
      const savedNotification = await newNotification.save();
      console.log(savedNotification);
      res.status(200).json("The post has been liked.");
      console.log(post);
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      await Notification.deleteOne({$and: [{senderId: req.body.userId}, {postId: post._id.toString()}, {notificationType: 1}]});
      res.status(200).json("The post has been disliked!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
})


//geting a post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//geting all posts of the users he is following
router.get("/timeline/:userId/:token", validateTokenParams ,  async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPost = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPost));
  } catch (err) {
    res.status(500).json(err);
  }
});

//geting all posts of a user.
router.get("/:userId/:token", validateTokenParams , async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

//comment on a post.
router.post("/comment", validateTokenBody , async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    await post.updateOne({ $push: { comments: 
      {userId: req.body.userId, comment: req.body.comment, commentId: post.comments.length}
    } });
      const newNotification = new Notification({
        senderId: req.body.userId,
        receiverId: post.userId,
        postId: post._id.toString(),
        notificationType: 2
      });
      const savedNotification = await newNotification.save();
      console.log(savedNotification);
      res.status(200).json("The comment is posted.");
      console.log(post);
  } catch (err) {
    res.status(500).json(err);
  }
})

//delete a comment.
router.post("/deleteComment", validateTokenBody, async (req, res) => {
  try {
  const post = await Post.findById(req.body.postId);
  //delete a comment.
  for (var i = 0; i<post.comments.length; i++) {
    if (post.comments[i].commentId === req.body.commentId) {
      console.log(post.comments[i])
      await post.updateOne({$pull: {comments: post.comments[i]}})
      await Notification.deleteOne({$and: [{senderId: req.body.userId}, {postId: post._id.toString()}, {notificationType: 2}]});
      }
    }

    //making a new temporary array to store comments without id..
    var newCommentsArray = [];
    for (var i = 0; i<post.comments.length; i++) {
      if (post.comments[i].commentId != req.body.commentId){
      newCommentsArray.push({userId: post.comments[i].userId, comment: post.comments[i].comment})
      }
    }
    
    //updating post by deleting all comments.
    await post.updateOne({$set: {comments: []}});

    //storing all comments by updated ids.
    for (var i = 0;i<newCommentsArray.length; i++) {
      await post.updateOne({$push: {comments: {
        userId: newCommentsArray[i].userId,
        commentId: i,
        comment: newCommentsArray[i].comment
      }}})
    }
  res.status(200).json("comment is deleted!")
  }
  catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;