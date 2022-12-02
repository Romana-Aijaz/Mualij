const Post = require("../model/postsModel")
const Blogs = require("../model/Blogs");
const GroupPosts = require("../model/GroupPosts");
const Group = require("../model/Group");

const deleteLikes = async (userId) => {
   try {
    const posts = await Post.find();
    for (var i = 0; i<posts.length; i++) {
      for (var j = 0; j<posts[i].likes.length; j++) {
        if (posts[i].likes[j] === userId){
            await posts[i].updateOne({$pull: {likes: userId}})
        }
    }
    }

    const blogs = await Blogs.find();
    for (var i = 0; i<blogs.length; i++) {
        for (var j = 0; j<blogs[i].likes.length; j++) {
          if (blogs[i].likes[j] === userId){
              await blogs[i].updateOne({$pull: {likes: userId}})
          }
      }
      }

    const groupPosts = await GroupPosts.find();
    for (var i = 0; i<groupPosts.length; i++) {
      for (var j = 0; j<groupPosts[i].likes.length; j++) {
        if (groupPosts[i].likes[j] === userId){
            await groupPosts[i].updateOne({$pull: {likes: userId}})
        }
    }
    }
    return true;
   }
   catch (err) {
    return false;
   }
}

const deleteComments = async (userId) => {
    try {
    const posts = await Post.find();
    for (var i = 0; i<posts.length; i++) {
      for (var j = 0; j<posts[i].comments.length; j++) {
        if (posts[i].comments[j].userId === userId){
            await posts[i].updateOne({$pull: {comments: comments[j]}})
        }
    }
    }

    const groupPosts = await GroupPosts.find();
    for (var i = 0; i<groupPosts.length; i++) {
      for (var j = 0; j<groupPosts[i].comments.length; j++) {
        if (groupPosts[i].comments[j].userId === userId){
            await groupPosts[i].updateOne({$pull: {comments: comments[j]}})
        }
    }
    }
    return true;
}
catch (err) {
    return false;
}
}

const deleteMember = async (userId) => {
     try {
      const groups =  await Group.find();
      for (var i = 0; i<groups.length; i++) {
        for (var j = 0; j<groups[i].members.length; j++) {
          if (groups[i].members[j] === userId){
              await groups[i].updateOne({$pull: {members: userId}})
          }
      }
      }
      return true;
     }
     catch (err) {
        return false;
     }
}
module.exports = {deleteLikes, deleteComments, deleteMember};