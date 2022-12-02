//const router = require("express").Router();
const User = require("../model/userDbModel");
const Report = require("../model/Report");
const Therapist = require("../model/Therapist");
const Post = require("../model/postsModel");
const Group = require("../model/Group");
const Schedule = require("../model/Schedule");
const GroupPost = require("../model/GroupPosts");
const Conversation = require("../model/Conversation");
const path = require("path");
const Blogs = require("../model/Blogs")
const BlockedUser = require("../model/BlockedUser");

const AdminBro = require('admin-bro');
const mongooseAdminBro = require('@admin-bro/mongoose');
const expressAdminBro = require('@admin-bro/express');
AdminBro.registerAdapter(mongooseAdminBro)
const contentParent = {
  name: 'content',
  icon: 'Accessibility',
}
const AdminBroOptions = {
  resources: [User, Therapist],
  branding: {
    companyName: 'Mualij Admin',
    logo: '',
    softwareBrothers: false,
  },
  dashboard: {
    handler: async () => {
       return "hey"
    },
    component: ''
  },
}
const adminBro = new AdminBro(AdminBroOptions)
const router = expressAdminBro.buildRouter(adminBro)

/*router.get("/posts", async (req, res) => {
  res.status(200).json("got it")
})

//view all users.
router.get("/allUsers/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allUsers = await User.find();
      res.status(200).json(allUsers)
    }
    else {
      res.status(503).json("You aren't allowed to view all users.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
  })

  //view all therapists.
router.get("/allTherapists/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allTherapists = await Therapist.find();
      res.status(200).json(allTherapists)
    }
    else {
      res.status(503).json("You aren't allowed to view all therapists.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
  })

  //view all posts.
router.get("/allPosts/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allPosts = await Post.find();
      res.status(200).json(allPosts)
    }
    else {
      res.status(503).json("You aren't allowed to view all posts.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
  })

  //view all conversations.
router.get("/allConversations/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allConversations = await Conversation.find();
      res.status(200).json(allConversations)
    }
    else {
      res.status(503).json("You aren't allowed to view all conversations.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
  })

  //view all groups.
router.get("/allGroups/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allGroups = await Group.find();
      res.status(200).json(allGroups)
    }
    else {
      res.status(503).json("You aren't allowed to view all groups.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
  })
  
 //view all groups posts.
router.get("/allGroupsPosts/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allGroupsPosts = await GroupPost.find();
      res.status(200).json(allGroupsPosts)
    }
    else {
      res.status(503).json("You aren't allowed to view all groups posts.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//view all reports.
router.get("/allReports/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const allReports = await Report.find();
      res.status(200).json(allReports)
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//view reported users.
router.get("/allReportedUsers/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const ReportedUsers = await Report.find({type: "user"});
      res.status(200).json(ReportedUsers)
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//view reported therapists.
router.get("/allReportedTherapists/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const ReportedTherapists = await Report.find({type: "therapist"});
      res.status(200).json(ReportedTherapists)
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//view reported posts.
router.get("/allReportedPosts/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const ReportedPosts = await Report.find({type: "post"});
      res.status(200).json(ReportedPosts)
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//view reported groups.
router.get("/allReportedGroups/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const ReportedGroups = await Report.find({type: "group"});
      res.status(200).json(ReportedGroups)
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//view reported posts of the groups.
router.get("/allReportedGroupsPosts/:userId" , async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
      const ReportedGroupsPosts = await Report.find({type: "groupPost"});
      res.status(200).json(ReportedGroupsPosts)
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//delete anything by report id.
router.delete("/:reportId/:userId" , async (req, res) => {
  var blockedUser;
  try {
    const user = await User.findById(req.params.userId);
    if (user.isAdmin) {
     const report = await Report.findById(req.params.reportId);
      if (report.type === "therapist") {
      const schedule = await Schedule.find({therapistId: report.therapistId});
      const therapist = await Therapist.findById(report.therapistId);
      console.log(therapist)
      console.log(schedule)
      blockedUser = new BlockedUser({
        therapist: therapist,
        user: {available: "false"}
      })
      blockedUser.save();
      if (schedule) {
        await Schedule.deleteMany({therapistId: report.therapistId});
      }
      await User.findByIdAndDelete(therapist.userId)
      await Therapist.findByIdAndDelete(report.therapistId)
      await Report.deleteMany({therapistId: report.therapistId});
      res.status(200).json("Therapist deleted successfully!!")
      }
      else if (report.type === "user") {
        const user = await User.findById(report.userId);
        if (user) {
        //delete all posts posted by user.
        const posts = await Post.find({userId: report.userId});
        console.log(posts)

        //delete posts created by user.
        if (posts) {
          await Post.deleteMany({userId: report.userId});;
        }
        //delete schedules booked by user.
        const schedules = await Schedule.find({userId: report.userId})
        if (schedules) {
          await Schedule.deleteMany({userId: report.userId});
        }

        //delete groups created by user or delete him as a member.
        const groups = await Group.find();
        for (var i = 0; i<groups.length; i++) {
          for (var j = 0; j<groups[i].members.length; j++) {
            if (groups[i].members[j] === report.userId){
            await groups[i].update({$pull: {members: groups[i].members[j]}})
            }
          }
        }
        const group = await Group.find({ownerId: report.userId});
        if (group) {
          await Group.deleteMany({ownerId: report.userId})
        }

        //delete groups post created by the user.
        const groupPosts = await GroupPost.find({userId: report.userId});
        if (groupPosts) {
          await GroupPost.deleteMany({userId: report.userId})
        }

        //delete blogs posted by the user.
        const blogs = await Blogs.find({authorId: report.userId});
        if (blogs) {
          await Blogs.deleteMany({authorId: report.userId})
        }
        const reportedUser = report.userId;
        blockedUser = new BlockedUser({
          user: user
        })
        blockedUser.save();
       await User.findByIdAndDelete(report.userId);
       await Report.deleteMany({userId: reportedUser})
       res.status(200).send("User deleted successfully!!");
      }
      else {
        res.status(404).json("User not found!")
      }
      }
    }
    else {
      res.status(503).json("You aren't allowed to view reports.")
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})*/

module.exports = router;