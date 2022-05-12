require('dotenv').config()
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology: true});

// check if connection is connected
const db = mongoose.connection;
db.on("error", function(){
    db.once("open", function(){
        console.log("Connected succesfully");
    })
})

// Define the Schema for questions collection
const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    userScore: {type: Number}
})


// Create model for questions
const userModel = new mongoose.model("users", userSchema);

// export model for server responses
module.exports = userModel;