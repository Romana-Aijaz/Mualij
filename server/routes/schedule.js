const router = require("express").Router();
const Schedule = require("../model/Schedule");
const Therapist = require("../model/Therapist.js");
const User = require("../model/userDbModel");
const bodyParser = require("body-parser");
//body parser required for fetching out the data from request body.
router.use(bodyParser.urlencoded({ extended: true }));
const path = require("path");
const {createTokens, validateTokenBody, validateTokenParams} = require("./JWT");

router.get("/", async (req, res)=> {
  /* try {
        const response = [];
        const searchSchedules = await Schedule.find();
        for (var i = 0; i < searchSchedules.length; i++) {
          const therapist = await Therapist.findById(searchSchedules[i].therapistId);
          response.push({scheduleId: searchSchedules[i]._id, therapistId: therapist._id, day: searchSchedules[i].day , date: searchSchedules[i].date, therapistName: therapist.username, duration: searchSchedules[i].duration});
        }
        res.status(200).json(response);
      } catch (err) {
        res.status(500).json(err);
    }*/
    res.sendFile(path.join(__dirname, "./schedule.html"));
})

router.post("/create",validateTokenBody , async(req, res) => {
    try {
      console.log(req.body.date)
    let verifyUser;
    var checkSlot;
    const therapist = await Therapist.findById(req.body.therapistId);
    const allTherapists = await Therapist.find();
    for (var i = 0; i<allTherapists.length; i++) {
        if (allTherapists[i].userId === req.body.userId){
          verifyUser = "Therapist is not allowed to book session!"
        }
    }
    if (verifyUser) {
      res.send(verifyUser)
    }
    else {
      if (req.body.day === "Monday" || req.body.day === "monday"){
         checkSlot = therapist.slots.Monday;
      }
      else if (req.body.day === "Tuesday" || req.body.day === "tuesday"){
        checkSlot = therapist.slots.Tuesday;
      }
      else if (req.body.day === "Wednesday" || req.body.day === "wednesday"){
        checkSlot = therapist.slots.Wednesday;
      }
      else if (req.body.day === "Thursday" || req.body.day === "thursday"){
        checkSlot = therapist.slots.Thursday;
      }
      else if (req.body.day === "Friday" || req.body.day === "friday"){
        checkSlot = therapist.slots.Friday;
      }
      else if (req.body.day === "Saturday" || req.body.day === "saturday"){
        checkSlot = therapist.slots.Saturday;
      }
      else if (req.body.day === "Sunday" || req.body.day === "sunday"){
        checkSlot = therapist.slots.Sunday;
      }
      if (checkSlot.includes(req.body.time)) {
        var slotBooked = false;
        if (therapist.pendingSchedules.length != 0) {
          for (let i in therapist.pendingSchedules){
            const checkBookedSchedule = await Schedule.findById(therapist.pendingSchedules[i])
            const bookedDate = checkBookedSchedule.date;
            console.log(bookedDate)
            let currentDate;
            let bookedDay = bookedDate.getDate();
            let bookedMonth = bookedDate.getMonth() + 1;
            let bookedYear = bookedDate.getFullYear();
             if (bookedDay<10) {
                currentDate = `${bookedYear}-${bookedMonth}-0${bookedDay}`;
             }
             else {
              currentDate = `${bookedYear}-${bookedMonth}-${bookedDay}`;
            }
            if (currentDate === req.body.date && checkBookedSchedule.time === req.body.time){
              slotBooked= true;
            }
          }
          if (slotBooked) {
            res.status(500).json("Slot not free!")
          }
          else {
            const newSchedule = new Schedule(req.body);
            const savedSchedule = await newSchedule.save();
            await therapist.updateOne({$push: {pendingSchedules: (savedSchedule._id.toString())}})
            res.status(200).json(savedSchedule);
          }
        }
        else {
        const newSchedule = new Schedule(req.body);
        const savedSchedule = await newSchedule.save();
        await therapist.updateOne({$push: {pendingSchedules: (savedSchedule._id.toString())}})
        res.status(200).json(savedSchedule);
        }
       /* const newSchedule = new Schedule(req.body);
        const savedSchedule = await newSchedule.save();
        await therapist.updateOne({$push: {pendingSchedules: (savedSchedule._id.toString())}})
        res.status(200).json(savedSchedule);*/
      }
      else {
        res.status(500).json("Slot not found!")
      }
    }
    } catch (err) {
    res.status(500).json(err);
    }
})

//get all schedules with therapist id.
router.get("/:therapistId/:userId", async (req, res) => {
    try {
      const therapist = await Therapist.findById(req.params.therapistId);
      if (therapist.userId === req.params.userId) {
        const schedules = await Schedule.find({ therapistId: req.params.therapistId});
        console.log(schedules);
        res.status(200).json(schedules);
      }
      else {
        res.status(403).json("You are not allowed to view schedules.")
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

//delete schedule by userid.
router.delete("/:scheduleId/:userId/:token", validateTokenParams, async (req, res) => {
      try {
        const schedule = await Schedule.findById(req.params.scheduleId);
        if (schedule.userId === req.params.userId) {
          const therapist = await Therapist.findById(schedule.therapistId);
          await therapist.updateOne({$pull: {pendingSchedules: req.params.scheduleId}})
          await Schedule.findByIdAndDelete(req.params.scheduleId);
          res.status(200).json("Schedule is Deleted Successfully!!");
        }
        else {
          res.status(403).json("You are not allowed to delete the schedule.")
        }
      } catch (err) {
        res.status(500).json(err);
      }
})

//delete schedule by therapistid.
router.delete("/:scheduleId/:therapistId/:userId/:token", validateTokenParams, async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.therapistId);
    if (therapist.userId === req.params.userId){
    const schedule = await Schedule.findById(req.params.scheduleId);
        if (schedule.therapistId === req.params.therapistId) {
          await therapist.updateOne({$pull: {pendingSchedules: req.params.scheduleId}});
          await Schedule.findByIdAndDelete(req.params.scheduleId);
          res.status(200).json("Schedule is Deleted Successfully!!");
        }
        else {
          res.status(403).json("You are not allowed to delete the schedule.")
        }
      }
        else {
          res.status(403).json("You are not allowed to delete the schedule.")
        }
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;