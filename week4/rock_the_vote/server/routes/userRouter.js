const express = require('express');
const userRouter = express.Router();
const User = require('./userRouter');

// Get All user    
userRouter.get('/', (req, res, next) => {
    User.find((err, user) => err ? res.status(500) && next(err) : res.status(200).send(user));
})

// Get User by Search Term
userRouter.get('/search', (req, res, next) => {
    const {username} = req.query;
    const pattern = new RegExp(username);
    User.find({ name: { $regex:  pattern, $options: 'i' } }, (err, user) => err ? res.status(500) && next(err) : res.status(200).send(user));
})

// Get user by Id
userRouter.get('/:userId', (req, res, next) => {
    User.findById(req.params.userId, (err, user) => err ? res.status(500) && next(err) : res.status(200).send(user));
})

// Add New user
userRouter.post('/', (req, res, next) => {
    const newUser = new User(req.body);
    newUser.save((err, saveduser) => err ? res.status(500) && next(err) : res.status(201).send(saveduser));
})

// Delete user
userRouter.delete('/:userId', (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userId}, (err, deletedUser) => err ? res.status(500) && next(err) : res.status(200).send(deletedUser));
})



// Update user
userRouter.put('/:userId', (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        req.body, 
        {new: true},
        (err, updatedUser) => err ? res.status(500) && next(err) : res.status(201).send(updatedUser)
    );
})

module.exports = userRouter;