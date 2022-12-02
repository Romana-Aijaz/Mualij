const router = require("express").Router();
const User = require("../model/userDbModel");
const Therapist = require("../model/Therapist");
const Group = require("../model/Group");
const GroupPost = require("../model/GroupPosts");
const path = require("path");
const Notification = require("../model/Notification");
const {createTokens, validateTokenBody, validateTokenParams} = require("./JWT");
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./user.html"));
});


//creating a group
router.post("/createGroup", validateTokenBody, async (req, res) => {
  try{
  const verifyOwner = await User.findById(req.body.userId);
  if (verifyOwner) {
    const newGroup = new Group({
      groupName: req.body.groupName,
      ownerId: req.body.userId
    });
    try {
    const savedGroup = await newGroup.save();
    res.status(200).json(savedGroup);
    } 
    catch (err) {
    res.status(500).json(err);
    }
  }
  else {
    res.status(503).json("request failed!")
  }}
  catch(err) {
    res.status(500).json(err);
  }
});

//join group.
router.post("/joinGroup", validateTokenBody, async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId)
    const verifyMember = await User.findById(req.body.userId);
    if (verifyMember){
    if (verifyMember._id.toString() === group.ownerId) {
        res.status(503).json("You cannot join your own group");
    }
    else if (!(group.members.includes(req.body.userId))) {
        await group.updateOne({$push: {members: verifyMember._id.toString()}})
        res.status(200).json("Group joined successfully!");
    }
    else {
      res.status(503).json("You are already member of the group.")
    }
  }
  else {
    res.status(404).json("User not found!")
  }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//leave group.
router.post("/leaveGroup", validateTokenBody, async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId)
    const verifyMember = await User.findById(req.body.userId);
    if (verifyMember){
    if (verifyMember._id.toString() === group.ownerId) {
        res.status(503).json("You cannot leave your own group");
    }
    else if (group.members.includes(req.body.userId)) {
        await group.updateOne({$pull: {members: verifyMember._id.toString()}})
        res.status(200).json("Group left!");
    }
    else {
      res.status(503).json("You not a member of the group.")
    }
  }
  else {
    res.status(404).json("User not found!")
  }
  }
  catch (err) {
    res.status(500).json(err);
  }
});


//set profile pic of the group.
router.post("/profilePic", validateTokenBody ,async (req, res) => {
  try {
    const findGroup = await Group.findById(req.body.groupId);
    if (req.body.userId === findGroup.ownerId){
        await findGroup.updateOne({$set: {groupProfilePic: req.body.profilePic}})
        res.status(200).json("successfull!")
    }
    else {
      res.status(503).json("Only group owner can change the profile picture!")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//set cover pic of the group.
router.post("/coverPic", validateTokenBody ,async (req, res) => {
    try {
      const findGroup = await Group.findById(req.body.groupId);
      if (req.body.userId === findGroup.ownerId){
          await findGroup.updateOne({$set: {groupCoverPic: req.body.profilePic}})
          res.status(200).json("successfull!")
      }
      else {
        res.status(503).json("Only group owner can change the cover picture!")
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

//post anything in group.
router.post("/post", validateTokenBody , async (req, res) => {
  try {
     const findGroup = await Group.findById(req.body.groupId);
     if (findGroup.members.includes(req.body.userId) || findGroup.ownerId === req.body.userId){
        const user = await User.findById(req.body.userId);
        console.log(user)
        const createGroupPost = new GroupPost(req.body);
        createGroupPost.save();
        await findGroup.updateOne({$push: {posts: createGroupPost._id.toString()}})
        console.log(createGroupPost)
        res.status(200).json(createGroupPost);
     }
     else {
        res.status(503).json("Only group members can post in a group!");
     }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//get all posts in the group 
router.get("/:groupId/:userId/:token", validateTokenParams, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (group.ownerId === req.params.userId || group.members.includes(req.params.userId)){
      const posts = await GroupPost.find({groupId: req.params.groupId})
      if (posts) {
        res.status(200).json(posts)
      }
      else {
        res.status(403).json("Posts doesn't exist");
      }
  }
  else {
    console.log("not")
    res.status(403).json("You are not allowed to see group's posts!")
  }
}
  catch (err) {
    res.status(500).json(err);
  }
})

//delete a post from the group.
router.post("/deletePost", async (req, res) => {
  try {
     const group = await Group.findById(req.body.groupId);
     const posts = await GroupPost.findById(req.body.groupPostId);
     if (req.body.userId === group.ownerId || req.body.userId === posts.userId) {
        await GroupPost.deleteOne({ _id: req.body.groupPostId });
        await group.updateOne({$pull: {posts: req.body.groupPostId}});
        res.status(200).json("Post deleted successfully!");
     }
     else {
       res.status(503).json("You can only delete your own post!")
     }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

//like a post.
router.patch("/like", validateTokenBody, async (req, res) => {
  try {
    const post = await GroupPost.findById(req.body.groupPostId);
    const user = await User.findById(req.body.userId);
    const group = await Group.findById(post.groupId);
    if ((!(group.members.includes(req.body.userId)) && (group.ownerId != req.body.userId))  ) {
         res.status(503).json("Only group members can like a post!")
    }
    else {
    if ((!(post.likes.includes(req.body.userId)))) {
      await post.updateOne({$push: {likes: req.body.userId}})
      const newNotification = new Notification({
        senderId: req.body.userId,
        receiverId: post.userId,
        groupPostId: post._id.toString(),
        groupId: post.groupId,
        notificationType: 1
      });
      const savedNotification = await newNotification.save();
      console.log(savedNotification);
      res.status(200).json("Post has been liked!")
    }
   else {
    await Notification.deleteOne({$and: [{senderId: req.body.userId}, {groupPostId: post._id.toString()}, {notificationType: 1}]});
    await post.updateOne({$pull: {likes: req.body.userId}})
    res.status(200).json("Post has been disliked!")
   }
  }
  } catch (err) {
    res.status(500).json(err);
  }
})

//comment a post.
router.patch("/comment", validateTokenBody, async (req, res) => {
  try {
    const post = await GroupPost.findById(req.body.groupPostId);
    const group = await Group.findById(post.groupId);
    const user = await User.findById(req.body.userId);
    if ((!(group.members.includes(req.body.userId))) && group.ownerId != req.body.userId ) {
      res.status(503).json("Only group members can like a post!")
    }
   else {
    //updating a post by storing a new comment that user has posted.
    await post.updateOne({$push: {comments: {
      userId: req.body.userId,
      commentId: post.comments.length,
      comment: req.body.comment
    }}})

    //sending notification to a user of a comment.
    const newNotification = new Notification({
      senderId: req.body.userId,
      receiverId: post.userId,
      groupPostId: post._id.toString(),
      groupId: post.groupId,
      notificationType: 2
    });
    const savedNotification = await newNotification.save();
    console.log(savedNotification);
    res.status(200).json("comment is posted")
   }
  } catch (err) {
    res.status(500).json(err);
  }
})

//delete a comment.
router.patch("/deleteComment", validateTokenBody , async (req, res) => {
  try {
    const post = await GroupPost.findById(req.body.groupPostId);
    const group = await Group.findById(post.groupId);
    const user = await User.findById(req.body.userId);
    if ((!(group.members.includes(req.body.userId))) && group.ownerId != req.body.userId ) {
      res.status(503).json("Only group members can delete a comment!")
    }
   else {
    //delete a comment.
    for (var i = 0; i<post.comments.length; i++) {
      if (post.comments[i].commentId === req.body.commentId) {
        console.log(post.comments[i])
        await post.updateOne({$pull: {comments: post.comments[i]}})
        await Notification.deleteOne({$and: [{senderId: req.body.userId}, {groupPostId: post._id.toString()}, {notificationType: 2}]});
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
        
    res.status(200).json("comment is deleted")
   }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;