const express = require("express");
const {
    registerUser,
    loginUser,
    logout
} = require("../controllers/user");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

//user routes
router.route("/user/register").post(registerUser);

router.route("/user/login").post(loginUser);


router.route("/user/logout").get(logout);

module.exports = router;
