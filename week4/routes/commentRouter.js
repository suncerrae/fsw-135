const express = require ('express');
const commentRouter = express.Router();
const Comment = require('../models/comment');



// GET ALL COMMENTS
commentRouter.get("/", (req, res, next) => {
    Comment.find((err, allComments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allComments)
    })
})

// GET ALL COMMENTS UNDER USER ID
commentRouter.get('/user', (req, res, next) => {
    Comment.find({ user: req.user._id }, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

// GET ONE COMMENT
commentRouter.get("/:commentId", (req, res, next) => {
    Comment.findOne((err, oneComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(oneComment)
    })
})

// POST COMMENT
commentRouter.post("/", (req, res, next) => {
    req.body.user = req.user._id
    const newComment = new Comment(req.body)
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedComment)
    })
})

// UPDATE COMMENT
commentRouter.put("/:commentId", (req, res, next) => {
    Comment.findOneAndUpdate(
        {_id: req.params.commentId, user: req.user._id}, 
        req.body, 
        {new: true}, 
        (err, updatedComment) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedComment)
        }
    )
})

// DELETE COMMENT
commentRouter.delete("/:commentId", (req, res, next) => {
    Comment.findOneAndDelete({_id: req.params.commentId, user: req.user._id}, (err, deletedComment) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedComment.commentcontents} from the database!`)
    })
})

module.exports = commentRouter;