import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { creatError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

//register
export const register = async (req, res, next) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const newUser = new User({
            ...req.body,
            password: hash,
            isAdmin: req.body.isAdmin,
        });

        await newUser.save();
        res.status(200).send('User has been created');
    } catch (error) {
        next(error);
    }
};

//login
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(creatError(404, 'User does not exist'));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(creatError(400, 'PassWord Is Wrong'));

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.jwt);

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true,
        })
            .status(200)
            .json({ details: { ...otherDetails }, isAdmin });
    } catch (error) {
        next(error);
    }
};
