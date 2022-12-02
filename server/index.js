const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const userDatabaseConnection = require("./model/userDB");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const conversationRouter = require("./routes/conversations");
const messageRouter = require("./routes/messages");
const therapistRouter = require("./routes/therapist");
const paymentRouter = require("./routes/payment");
const scheduleRouter = require("./routes/schedule");
const notificationRouter = require("./routes/notifications");
const groupRouter = require("./routes/group");
const reportRouter = require("./routes/reports");
const adminRouter = require("./routes/admin");
const blogRouter = require("./routes/blogs");
const searchRouter = require("./routes/search");
const User = require("./model/userDbModel");
const Therapist = require("./model/Therapist")
const path = require("path")
const adminLoginRouter = require("./routes/adminUtil")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/schedules", scheduleRouter);
app.use("/groups", groupRouter);
app.use("/posts", postRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.use("/therapists", therapistRouter);
app.use("/adminLogin", adminLoginRouter)
app.use("/payment", paymentRouter);
app.use("/search", searchRouter)
app.use("/notifications", notificationRouter);
app.use("/reports", reportRouter);
app.use("/blogs", blogRouter);
app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "./dashboard.html"))
});

//connecting server.
app.listen(8800, () => {
  console.log("server is running...");
});