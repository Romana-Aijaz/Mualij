const router = require("express").Router();
const Message = require("../model/Message");
const Conversation = require("../model/Conversation");
const path = require("path")

//adding conversations in database.
router.get("/check/:id/receiver/:rid", async (req, res) => {
  try {
    var temp1 = false;
    var temp2 = false;
    var temp3 = false;
    var temp4 = "";
    const conversations = await Conversation.find();
    for (var i =0; i<conversations.length; i++) {
      for (var j =0; j<conversations[i].members.length; j++){
        if (conversations[i].members[j] === req.params.id) {
            temp1 = true
        }
        if (conversations[i].members[j] === req.params.rid) {
          temp2 = true
      }
      }
      console.log(temp1, temp2)
      if (temp1 === true && temp2 === true) {
        temp3 = true;
        temp4 = (conversations[i]._id).toString();
      }
      temp1 = false;
      temp2 = false;
    }
    console.log("temp3", temp3, "convo", temp4)
    res.status(200).json(conversations);
  }
  catch (err) {
    res.status(500).json(err);
  }
})
//create a message.
router.post("/create", async (req, res) => {
  try {
    var temp1 = false;
    var temp2 = false;
    var temp3 = false;
    var temp4 = "";
    const conversations = await Conversation.find();
    for (var i =0; i<conversations.length; i++) {
      for (var j =0; j<conversations[i].members.length; j++){
        if (conversations[i].members[j] === req.body.senderId) {
            temp1 = true
        }
        if (conversations[i].members[j] === req.body.receiverId) {
          temp2 = true
      }
      }
      console.log(temp1, temp2)
      if (temp1 === true && temp2 === true) {
        temp3 = true;
        temp4 = (conversations[i]._id).toString();
      }
      temp1 = false;
      temp2 = false;
    }
    console.log("temp3", temp3, "convo", temp4)
    res.status(200).json(conversations);
  }
  catch (err) {
    res.status(500).json(err);
  }
})

router.get("/:conversationId/:sender/:text", async (req, res) => {
  const newMessage = new Message({
    conersationId: req.params.conversationId,
    sender: req.params.sender,
    text: req.params.text,
  });
  try {
    const savedMessage = await newMessage.save();
    console.log(savedMessage);
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//fetching conversationing from database.

router.get("/getConvo/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conersationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "./message.html"));
})
module.exports = router;