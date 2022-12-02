const router = require("express").Router();
//therapist data base schema is required.
const Therapist = require("../model/Therapist.js");
const User = require("../model/userDbModel");
const bodyParser = require("body-parser");
//body parser required for fetching out the data from request body.
router.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
const {validateTokenBody, validateTokenParams} = require("./JWT");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./therapist.html"));
});

//Therapist Register.
router.post("/register", validateTokenBody, async (req, res) => {
  try {
    const checkTherapist = await Therapist.find({userId: req.body.userId});
    if (checkTherapist.length != 0) {
      res.status(403).json("Therapist already exist with same email!")
    }
    else {
    const therapist = await new Therapist({
      userId: req.body.userId,
      price: req.body.price,
    });
    console.log(therapist);
    await therapist.save();
    res.status(200).json(therapist);
  }
  } catch (e) {
    res.status(500).json(e);
  }
});

//Get therapist details as a user.
router.get("/:therapistId", async (req, res) => {
  try {
   const therapist = await Therapist.findById(req.params.therapistId);
   const user = await User.findById(therapist.userId);
   const {password, ...otherDetails} = user._doc;
   res.status(200).json(otherDetails);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//Set slots for the therapists.
router.post("/createSlot" , validateTokenBody, async (req, res) => {
    try {
    //finding therapist details by searching the id from therapist collection.
    const therapist = await Therapist.findById(req.body.therapistId);
    if (therapist.userId === req.body.userId) {
      if (therapist.slots === null) {
        await therapist.updateOne({$set: {slots: req.body.slots}})
        res.status(200).json("Slot created successfully!")
      }
      else {
        res.status(500).json("request failed");
      }
    }
    else {
      res.status(403).json("You are not allowed to create the slot.")
    }
    }
    catch (e) {
        res.status(500).json(e);
    }
})

//edit therapist.
router.put("/:therapistId", validateTokenBody, async(req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.therapistId);
    if (therapist.userId === req.body.userId) {
      await therapist.updateOne({ $set: req.body });
      res.status(200).json("account is updated");
    }
    else {
      res.status(403).json("You are not allowed to edit the details.");
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
})

//delete all pending schedules of the therapist.
router.patch("/deletePendingSchedules/:therapistId", validateTokenBody , async (req, res) => {
  try {
  const therapist = await Therapist.findById(req.params.therapistId);
  console.log(req.body.userId)
  if (therapist.userId === req.body.userId) {
    await therapist.updateOne({$set: {pendingSchedules: []}})
    res.status(200).json("All schedules cancelled!")
  }
  else {
    res.status(403).json("You are not allowed to cancel all schedules!")
  }
  }
  catch (err) {
    res.status(500).json(err)
  }
})

//add user reviews to the therapist collection.
router.post("/addReviews", validateTokenBody ,async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.body.therapistId);
    let verifyUser = true;
    //const therapist = await Therapist.findById(req.body.therapistId);
    const allTherapists = await Therapist.find();
    for (var i = 0; i<allTherapists.length; i++) {
        if (allTherapists[i].userId === req.body.userId){
          verifyUser = false;
        }
    }
    if (verifyUser === true) {
      const therapist = await Therapist.findById(req.body.therapistId);
      await therapist.updateOne({$push: {reviews: {user: req.body.userId, review: req.body.review}}})
      res.status(200).json("Review added successfully!");
    }
    else {
      res.status(503).json("Therapist is not allowed to add reviews!")
    }
  }
  catch (err) {
    res.status(500).json(err)
  }
}) 

//delete therapist.
router.delete("/:therapistId", validateTokenBody, async (req,res) => {
  console.log(req.body);
})

module.exports = router;