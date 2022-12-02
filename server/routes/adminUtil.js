const router = require("express").Router();
const bcrypt = require('bcrypt')
//fetching all schemas.
const User = require("../model/userDbModel");
const path = require('path');

router.get("/", async (req, res) => {
     res.sendFile(path.join(__dirname, "./adminLogin.html"))
})

router.post("/sendDetails" , async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        !user && res.status(404).send("user not found!");
    
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        !validPassword && res.status(400).json("wrong password");
        if (user.isAdmin === true) {
            const {password, ...otherDetails} = user._doc;
            console.log(otherDetails);
            res.status(200).json(otherDetails);
        }
        else {
            res.status(404).json("User not found!")
        }
      } catch (err) {
        console.log(err);
      }
})
module.exports = router;