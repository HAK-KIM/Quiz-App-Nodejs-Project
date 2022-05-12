require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000 ;

// allow server to understand json formart
app.use(express.urlencoded());
app.use(express.json());

// allow all device
app.use(cors({origin: '*'}));

// create server
app.listen(PORT, () => {
    console.log('listening on port ' + PORT)
})


// Define static routes
app.use(express.static("./public"));

// require route
let questionRouter = require("./routes/question_router");
let userRouter = require("./routes/user_router.js")
let emailRouter = require("./routes/nodemailer")

// use routes
app.use("/quiz", questionRouter);
app.use("/users", userRouter);
app.use("/emails", emailRouter)
