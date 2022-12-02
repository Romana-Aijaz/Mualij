const router = require("express").Router();
const Conversation = require("../model/Conversation");
const User = require("../model/userDbModel");


//inserting conversation in database.
router.get("/:senderId/:receiverId", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.params.senderId, req.params.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//fetching conversation of a user with his id.
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;