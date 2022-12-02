const router = require("express").Router();

//fetching all schemas.
const User = require("../model/userDbModel");
const Blogs = require("../model/Blogs");
const Group = require("../model/Group");
const GroupPosts = require("../model/GroupPosts");
const Schedule = require("../model/Schedule")
const Post = require("../model/postsModel");
const Notification = require("../model/Notification");

const bodyParser = require("body-parser");
//body parser required for fetching out the data from request body.

router.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
//required for password hashing.
const bcrypt = require("bcrypt");

//importing jwt tokens.
const {createTokens, validateTokenBody, validateTokenParams} = require("./JWT");
const {deleteLikes, deleteComments, deleteMember} = require("./deleteUsers");
const cookieParser = require("cookie-parser");
//cookie parser is wrapper for jwt.
router.use(cookieParser());

router.get("/allUsers/:userId/:token", validateTokenParams, async (req, res) => {
   try { 
    var allUsersList = []
    const allUsers = await User.find();
    
    for (var i = 0; i<allUsers.length; i++) {
      const {password, ...otherDetails} = allUsers[i]._doc;
      allUsersList.push(otherDetails);
    }
    res.status(200).json(allUsersList);
   }
   catch (err) {
    res.status(500).json(err);
   }
})

router.get("/:userId/:token", validateTokenParams, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const {password, ...otherDetails} = user._doc;
    res.status(200).json(otherDetails)
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.post("/verifyUser", async (req, res) => {
  res.status(200).json(req.body.token);
})

//User Register.
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.userName,
      age: req.body.age,
      city: req.body.city,
      occupation: req.body.occupation,
      password: hashedPassword,
      relationshipStatus: req.body.relationshipStatus,
      dateOfBirth : req.body.dateOfBirth
    });
    console.log(user);
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (e) {
    res.status(500).json(e);
  }
});

//user login
router.post("/login", async (req, res)=> {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).send("user not found!");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");
    const token = createTokens(user);
    const {password, ...otherDetails} = user._doc;
    console.log(otherDetails);
    res.status(200).json({token, user: otherDetails});
  } catch (err) {
    console.log(err);
  }
})

//update
router.put("/:userId/:token", validateTokenParams, async (req, res) => {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.findById(req.params.userId);
      if (user || req.body.isAdmin) {
      await user.updateOne({ $set: req.body });
      res.status(200).json("account is updated");
      }
      else {
        res.status(403).json("User doesn't exists!")
      }
    } 
    catch (err) {
      res.status(500).json(err);
    }
});

//Delete
router.delete("/:userId/:token", validateTokenParams, async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (user) {
        const deleteLikesByUser = await deleteLikes(req.params.userId);
        const deletCommentsByUser = await deleteComments(req.params.userId);
        const deleteUserFromAllGroups = await deleteMember(req.params.userId);

        const postsByUser = await Post.find({userId: req.params.userId});
        if (postsByUser) {
          await Post.deleteMany({userId: req.params.userId});;
        }

        const blogs = await Blogs.find({authorId: req.params.userId});
        if (blogs) {
          await Blogs.deleteMany({authorId: req.params.userId});
        }

        const notifications = await Notification.find({$or: [{senderId: req.params.userId}, {receiverId: req.params.userId}]})
        if (notifications) {
          await Notification.deleteMany({$or: [{senderId: req.params.userId}, {receiverId: req.params.userId}]});
        }

        const schedules = await Schedule.find({userId: req.params.userId})
        if (schedules) {
          await Schedule.deleteMany({userId: req.params.userId});
        }

        const groups = await Group.find({ownerId: req.params.userId})
        if (groups) {
          await Group.deleteMany({ownerId: req.params.userId})
        }

        const groupPosts = await GroupPosts.find({userId: req.params.userId})
        if (groupPosts) {
          await GroupPosts.deleteMany({userId: req.params.userId})
        }

        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("User Deleted!");
      }
      //await User.deleteOne(user);
    } 
    catch (err) {
      res.status(500).json(err);
    }
});

//Get user by his id.
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user || req.body.isAdmin) {
    console.log("user: " + user);
    const {password, ...otherDetails} = user._doc;
    console.log(otherDetails);
    res.status(200).json(otherDetails); }
    else {
      res.status(403).json("User doesn't exists!")
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Follow a user
router.patch("/:id/follow", validateTokenBody, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId} });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        await user.updateOne({ $pull: { followers: req.body.userId} });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("user has been unfollowed");
    }
    } catch (err) {
      console.log(err);
      res.status(403).json("You cant follow yourself");
    }
  }
});

//get all friends of the user.
router.get("/friends/:userId/:token", validateTokenParams, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
    console.log(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//find a user by his username.
router.post("/byUsername", async (req, res) => {
  try {
   const user = await User.findOne({username: req.body.username});
   if (user) {
    const {password, ...otherDetails} = user._doc;
    res.status(200).json(otherDetails)
   }
   else {
    res.status(404).json("User not found!")
   }
  }
  catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
