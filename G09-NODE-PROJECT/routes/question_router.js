const express = require('express');
const router = express.Router();

// import question model
const questionModel = require('../models/model');


//  get question route
router.get('/questions/:id', (req, res) => {
    questionModel.find({user_id: req.params.id})
    .then((result) => {
        res.send(result);
    })
})

//  create question route
router.post('/create/:id', (req, res) => {
    questionModel.create(req.body)
    .then((result) => {
        res.status(201).send(result);  
    })
})

//  delete question route
router.delete('/delete/:id', (req, res) => {
    questionModel.deleteOne({_id: req.params.id})
    .then((result) => {
        res.status(200).send(result);
    })
})


//  update question route
router.put('/update/:id', (req, res) => {
    questionModel.updateOne({_id: req.params.id}, {title: req.body.title, answers: req.body.answers})
    .then((result) => {
        res.status(200).send(result);
    })
})

module.exports = router;