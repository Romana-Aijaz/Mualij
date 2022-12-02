const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://localhost:27017/Mualij",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("Connection failed to the Database!");
    } else {
      console.log("Connection established to the Database!");
    }
  }
);
