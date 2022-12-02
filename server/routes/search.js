const router = require("express").Router();
var bodyParser = require('body-parser')

//fetching all schemas.
const User = require("../model/userDbModel");
const Therapist = require("../model/Therapist")
const Blogs = require("../model/Blogs");
const Group = require("../model/Group");
const GroupPosts = require("../model/GroupPosts");
const Schedule = require("../model/Schedule")
const Post = require("../model/postsModel");
const Notification = require("../model/Notification");
router.use(bodyParser.urlencoded({ extended: false }))
const {validateTokenBody} = require("./JWT");

const path = require("path");

//searching user.
router.post("/user/:string", validateTokenBody, async (req, res) => {
    try {
    const regex = new RegExp(req.params.string, 'i')
    const therapists = await Therapist.find();
    const docs = await User.find({$or: [ {username: { $regex: regex }}, {email: { $regex: regex }}, 
        {firstName: { $regex: regex }}, {lastName: { $regex: regex }}
    ]});
    var searchedUsers = []
    var userTherapist = false;
    for (var i = 0; i<docs.length; i++) {
        for (var j = 0; j<therapists.length; j++ ) {
            if (therapists[j].userId === docs[i]._id.toString()) {
                userTherapist = true;
            }
        }
        if (userTherapist === false) {
            const {password, createdAt, updatedAt, following, coverPicture, isAdmin, __v, ...otherDetails} = docs[i]._doc
            searchedUsers.push(otherDetails)
        }
        userTherapist = false;
    }
    if (searchedUsers.length === 0) {
        res.status(404).json("No user found!")
    }
    else {
        res.status(200).json(searchedUsers)
    }
}
catch (err) {
    res.status(500).json(err);
}
})

//searching therapists.
router.post("/therapist/:string", validateTokenBody, async (req, res) => {
    try {
        const regex = new RegExp(req.params.string, 'i')
        const therapists = await Therapist.find();
        const docs = await User.find({$or: [ {username: { $regex: regex }}, {email: { $regex: regex }}, 
            {firstName: { $regex: regex }}, {lastName: { $regex: regex }}
        ]});
        var searchedUsers = []
        var pricePerSession;
        var userTherapist = false;
        for (var i = 0; i<docs.length; i++) {
            for (var j = 0; j<therapists.length; j++ ) {
                if (therapists[j].userId === docs[i]._id.toString()) {
                    pricePerSession = therapists[j].price;
                    userTherapist = true;
                }
            }
            if (userTherapist === true) {
                const {password, createdAt, updatedAt, following, coverPicture, isAdmin, __v, ...otherDetails} = docs[i]._doc
                const userTemporaryObject = {
                    _id: otherDetails._id.toString(),
                    username: otherDetails.username,
                    age: otherDetails.age,
                    dateOfBirth: otherDetails.dateOfBirth,
                    email: otherDetails.email,
                    followers: otherDetails.followers,
                    lastName: otherDetails.lastName,
                    firstName: otherDetails.firstName,
                    occupation: otherDetails.occupation,
                    profilePicture: otherDetails.profilePicture,
                    relationshipStatus: otherDetails.relationshipStatus,
                    pricePerSession: pricePerSession
                }
                console.log(userTemporaryObject);
                searchedUsers.push(userTemporaryObject)
            }
            userTherapist = false;
        }
        if (searchedUsers.length === 0) {
            res.status(404).json("No user found!")
        }
        else {
            res.status(200).json(searchedUsers)
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//searching groups.
router.post("/group/:string", validateTokenBody, async (req, res) => {
    try {
    const groups = await Group.find({groupName: { $regex: req.params.string }});
    var searchedGroups = [];
    for (var i = 0; i<groups.length; i++) {
        const {createdAt, updatedAt, __v, ...otherDetails} = groups[i]._doc;
        searchedGroups.push(otherDetails);
    }
    if (searchedGroups.length === 0) {
        res.status(404).json("Group not found!")
    }
    else {
        res.status(200).json(searchedGroups);
    }
    }
    catch (err) {
       res.status(500).json(err);
    }
})

//searching people based on location.
router.post("/location/:string", validateTokenBody, async (req, res) => {
    try {
    const regex = new RegExp(req.params.string, 'i')
    const users = await User.find({city: { $regex: regex }});
    var searchedUsers = [];
    for (var i = 0; i<users.length; i++) {
        const {password, createdAt, updatedAt, following, coverPicture, isAdmin, __v, ...otherDetails} = users[i]._doc
            searchedUsers.push(otherDetails)
    }
    if (searchedUsers.length === 0) {
        res.status(404).json("User not found!")
    }
    else {
        res.status(200).json(searchedUsers);
    }
    }
    catch (err) {
       res.status(500).json(err);
    }
})

//searching blogs.
router.post("/blog/:string", validateTokenBody, async (req, res) => {
    try {
    const regex = new RegExp(req.params.string, 'i')
    const blogs = await Blogs.find({$or: [{title: { $regex: regex }}, {content: {$regex: regex}} ] });
    var searchedBlogs = [];
    for (var i = 0; i<blogs.length; i++) {
        const {createdAt, updatedAt, __v, ...otherDetails} = blogs[i]._doc
            searchedBlogs.push(otherDetails)
    }
    if (searchedBlogs.length === 0) {
        res.status(404).json("Blog not found!")
    }
    else {
        res.status(200).json(searchedBlogs);
    }
    }
    catch (err) {
       res.status(500).json(err);
    }
})

module.exports = router;