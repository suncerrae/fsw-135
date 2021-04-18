const express = require ('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')


// GET ALL ISSUES
issueRouter.get("/", (req, res, next) => {
    Issue.find((err, allIssues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allIssues)
    })
})

// GET ALL ISSUES BY USER ID
issueRouter.get("/user", (req, res, next) => {
    Issue.find({ user: req.user._id }, (err, issues) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})

// GET ONE ISSUE
issueRouter.get("/:issueId", (req, res, next) => {
    Issue.findOne((err, oneIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(oneIssue)
    })
})

// POST ISSUE
issueRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedIssue)
    })
})

// UPDATE ISSUE
issueRouter.put("/:issueId", (req, res, next) => {
    Issue.findOneAndUpdate(
        {_id: req.params.issueId, user: req.user._id}, 
        req.body, 
        {new: true}, 
        (err, updatedIssue) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedIssue)
        }
    )
})

// DELETE ISSUE
issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findOneAndDelete({_id: req.params.issueId, user: req.user._id}, (err, deletedIssue) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedIssue.issuename} from the database!`)
    })
})

module.exports = issueRouter;