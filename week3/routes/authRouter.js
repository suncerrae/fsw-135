const express = require ('express');
const authRouter = express.Router();
const User = require('../models/user');

// GET ALL
authRouter.get("/", (req, res, next) => {
    User.find((err, allUsers) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(allUsers)
    });
})

// GET ONE
authRouter.get("/:userId", (req, res, next) => {
    User.findOne((err, oneUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(oneUser)
    });
})

// POST ONE
authRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    });
})

// UPDATE ONE
authRouter.put("/:userId", (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId}, 
        req.body, 
        {new: true}, 
        (err, updatedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedUser)
        }
    );
})

//DELETE ONE
authRouter.delete("/:userId", (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userId}, (err, deletedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedUser.username} from the database!`)
    });
})

module.exports = authRouter;