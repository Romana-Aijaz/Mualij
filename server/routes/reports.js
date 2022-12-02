const router = require("express").Router();
const User = require("../model/userDbModel");
const Report = require("../model/Report");
const Therapist = require("../model/Therapist");
const Post = require("../model/postsModel");
const Group = require("../model/Group");
const GroupPost = require("../model/GroupPosts");
const path = require("path");
const { validateTokenBody } = require("./JWT");

router.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "./reports.html"));
})

//report user account.
router.post("/user", validateTokenBody, async (req, res) => {
     try {
      const user = await User.findById(req.body.userId);
      if (user){
       const checkReport = await Report.findOne({$and: [{userId: req.body.userReported}, {reporterId: req.body.userId}]});
       if (checkReport) {
        res.status(503).json("You have already reported this account!")
       }
       else {
       const report = new Report({
        reporterId: req.body.userId,
        userId: req.body.userReported,
        type: "user",
        reasonOfReporting: req.body.reasonOfReporting
       })
       report.save();
       res.status(200).json("Account is reported.")
    }
    }
    else {
        res.status(503).json("Request failed!")
    }
     }
     catch (err) {
       res.status(500).json(err);
     }
})

//report therapist account.
router.post("/therapist", validateTokenBody, async (req, res) => {
    try {
      console.log(req.body);
     const user = await User.findById(req.body.userId);
     if (user){
      const checkReport = await Report.findOne({$and: [{therapistId: req.body.therapistId}, {reporterId: req.body.userId}]});
      if (checkReport) {
       res.status(503).json("You have already reported this account!")
      }
      else {
      const report = new Report({
       reporterId: req.body.userId,
       therapistId: req.body.therapistId,
       type: "therapist",
       reasonOfReporting: req.body.reasonOfReporting
      })
      report.save();
      res.status(200).json("Account is reported.")
   }
   }
   else {
       res.status(503).json("Request failed!")
   }
    }
    catch (err) {
      res.status(500).json(err);
    }
})

//report a group.
router.post("/group", validateTokenBody , async (req, res) => {
    try {
     const user = await User.findById(req.body.userId);
     if (user){
      const checkReport = await Report.findOne({$and: [{groupId: req.body.groupId}, {reporterId: req.body.userId}]});
      if (checkReport) {
       res.status(503).json("You have already reported this group!")
      }
      else {
        const group = await Group.findById(req.body.groupId);
        if (group.members.includes(req.body.userId)){
         const report = new Report({
          reporterId: req.body.userId,
          groupId: req.body.groupId,
          type: "group",
          reasonOfReporting: req.body.reasonOfReporting
         })
         report.save();
         res.status(200).json("group is reported.")
       }
       else {
           res.status(503).json("You must be member of the group to report.")
       }
   }
   }
   else {
       res.status(503).json("Request failed!")
   }
    }
    catch (err) {
      res.status(500).json(err);
    }
})

//report a post
router.post("/post", validateTokenBody, async (req, res) => {
    try {
     const user = await User.findById(req.body.userId);
     if (user){
      const checkReport = await Report.findOne({$and: [{postId: req.body.postId}, {reporterId: req.body.userId}]});
      if (checkReport) {
       res.status(503).json("You have already reported this post!")
      }
      else {
      const report = new Report({
       reporterId: req.body.userId,
       postId: req.body.postId,
       type: "post",
       reasonOfReporting: req.body.reasonOfReporting
      })
      report.save();
      res.status(200).json("Post is reported.")
   }
   }
   else {
       res.status(503).json("Request failed!")
   }
    }
    catch (err) {
      res.status(500).json(err);
    }
})

//report a group's post.
router.post("/groupPost", async (req, res) => {
    try {
     const user = await User.findById(req.body.userId);
     if (user){
      const checkReport = await Report.findOne({$and: [{ groupPostId: req.body.groupPostId}, {reporterId: req.body.userId}]});
      if (checkReport) {
       res.status(503).json("You have already reported this post!")
      }
      else {
        const groupPost = await GroupPost.findById(req.body.groupPostId);
        console.log(groupPost.groupId);
        const group = await Group.findById(groupPost.groupId);
        if (group.members.includes(req.body.userId)){
         const report = new Report({
          reporterId: req.body.userId,
          groupPostId: req.body.groupPostId,
          type: "groupPost",
          reasonOfReporting: req.body.reasonOfReporting
         })
         report.save();
         res.status(200).json("group's post is reported.")
       }
       else {
           res.status(503).json("You must be member of the group to report the post.")
       }
   }
   }
   else {
       res.status(503).json("Request failed!")
   }
    }
    catch (err) {
      res.status(500).json(err);
    }
})

module.exports = router;