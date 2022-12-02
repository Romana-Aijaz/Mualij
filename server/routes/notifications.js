const router = require("express").Router();
const Notification = require("../model/Notification")

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./user.html"));
});
//creating a post

router.get("/getAll", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/unseen", async (req, res) => {
    try {
        const notifications = await Notification.find({seen: false})
        res.status(200).json(notifications)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

router.get("/receiverId/:id" , async (req, res) => {
    try {
    const notifications = await Notification.find({receiverId: req.params.id});
        res.status(200).json(notifications);
   } catch (err) {
     res.status(500).json(err);
  }
})

router.get("/senderId/:id" , async (req, res) => {
    try {
    const notifications = await Notification.find({senderId: req.params.id});
    res.status(200).json(notifications);
   } catch (err) {
     res.status(500).json(err);
  }
})

router.get("/type/:number/receiver/:id" , async (req, res) => {
    try {
    const notifications = await Notification.find({$and: [{notificationType: req.params.number}, {receiverId: req.params.id}]});
    res.status(200).json(notifications);
   } catch (err) {
     res.status(500).json(err);
  }
})
module.exports = router;