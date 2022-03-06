
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.isAuthenticatedUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        res.status(401).json({
            msg: "Please Login to access this resource"
        })
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
};
