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
const questionSchema = new mongoose.Schema({
    title: {type: String, required: true},
    answers: [
        {choice: {type: String, required: true}, corrected:{type: Boolean}}
    ],  
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

// Create model for questions
const questionModel = new mongoose.model("questions", questionSchema);

// export model for server responses
module.exports = questionModel;