import { User } from '../Models/Users.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const newUser = new User({ name, email, password });

        newUser.password = await bcrypt.hash(password, 12);

        await newUser.save();

        res.status(201).json({ message: 'Signup successful', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};
export const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json(
                {
                    message: 'AUth failed',
                    success: false
                });
        }
        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            return res.status(403).json(
                {
                    message: 'AUth failed',
                    success: false
                });
        }
        const jwtToken = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json(
            {
                message: 'Login successful',
                success: true,
                token: jwtToken,
                user: user.name,

            });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Internal server error',
                success: false
            });
    }
};
