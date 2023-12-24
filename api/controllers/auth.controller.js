import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const user = await User.findOne({username});
    if(user) {
        return next(errorHandler(403, 'User already exists!'));
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.status(200).json("signed up successfully!");
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) {
            return next(errorHandler(404, "User not found!"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(401, "Invalid credentials!"));
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        const {password:pass, ...rest} = validUser._doc;
        res
        .cookie('access_token', token, {httpOnly: true})
        .status(200)
        .json(rest);

    } catch (error) {
        next(error);
    }
};

export const signout = async (req, res, next) => {
    try {
        res.clearCookie('access_token');
        res.status(200).json({message: "User has been logged out!"});
    } catch (error) {
        next(error);
    }
};