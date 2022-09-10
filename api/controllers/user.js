import User from '../models/User.js';
import { creatError } from '../utils/error.js';

//creat
export const createUser = async (req, res, next) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        next(error);
    }
};

//update
export const updatedUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

//delete
export const deletedUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json('Deleted success');
    } catch (error) {
        next(error);
    }
};

//get one
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

//get all
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
