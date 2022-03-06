const User = require("../models/user");
const sendToken = require("../utils/jwtToken");

//1. Register a User
exports.registerUser = async (req, res, next) => {
    try {
        const { Name, email, password } = req.body;

        const user = await User.create({
            Name,
            email,
            password,
        });
        sendToken(user, 201, res);
    } catch (error) {
        res.send(error);
    }
};

//2. Login User
exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // checking if user has given password and email both

        if (!email || !password) {
            res.status(400).json({
                msg: "Please Enter Email & Password",
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            res.status(401).json({
                msg: "Invalid userName or password",
            });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            res.status(401).json({
                msg: "Invalid userName or password",
            });
        }
        sendToken(user, 201, res);
    } catch (error) {
        res.send(error);
    }
};

// 3.Logout User
exports.logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    } catch (error) {
        res.send(error);
    }
};
