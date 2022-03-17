import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // find existing user
        const existingUser = await User.findOne({ email });

        // did not find matching user with that info
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        // check hashed password for match
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        // password hash did not match
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials. " })

        // test is where a secret phrase would go from .env files
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        // send to client the user we found and the json web token
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        // something did not work right send error response to client
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmedPassword, firstName, lastName } = req.body;

    try {
        // check if existing user in db
        const existingUser = await User.findOne({ email });

        // found match return error saying user already exist
        if (existingUser) return res.status(400).json({message: "User already exist."});

        // if password does not match the confirm password return error no match
        if(password !== confirmedPassword) return res.status(400).json({ message: "Passwords dont match."});

        // hash and salt password. bcrypt.hash does the hashing second argument is for salt difficulty 12 is common
        const hashedPassword = await bcrypt.hash(password, 12)

        //create user in db and retunr to result to retunr to client
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});

        // get json web token for user access
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        // send to client the user we found and the json web token
        res.status(200).json({ result, token });
    } catch (error) {
        // something did not work right send error response to client
        res.status(500).json({ message: 'Something went wrong.' });
    }
}