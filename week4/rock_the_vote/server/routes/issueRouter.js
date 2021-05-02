const express = require('express');
const issueRouter = express.Router();
const Issue = require('../models/issue');

// Get All Issues    
issueRouter.get('/', (req, res, next) => {
    Issue.find((err, issue) => err ? res.status(500) && next(err) : res.status(200).send(issue));
})

// Get Issue by user Id
issueRouter.get('/user', (req, res, next) => {
    Issue.find({user: req.user._id}, (err, issue) => err ? res.status(500) && next(err) : res.status(200).send(issue));
})


// Add New Issue
issueRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => err ? res.status(500) && next(err) : res.status(201).send(savedIssue));
})


// Add Likes
issueRouter.put('/like/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        { $inc: { upVotes: 1  } },
        {new: true},
        (err, updateIssue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updateIssue)
        }
    )
})

// Dislike 
issueRouter.put('/dislike/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        { $inc: { downVotes: 1  } },
        {new: true},
        (err, updateIssue) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(updateIssue)
        }
    )
})

// Delete Issue
issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete({_id: req.params.issueId}, (err, deletedIssue) => err ? res.status(500) && next(err) : res.status(200).send(`Deleted ${deletedIssue}`));
})

// Update Issue
issueRouter.put('/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId},
        req.body, 
        {new: true},
        (err, updatedIssue) => err ? res.status(500) && next(err) : res.status(201).send(updatedIssue)
    )
})


module.exports = issueRouter;