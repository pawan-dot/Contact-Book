const express = require("express");
const {
    createcontact,
    getAllcontacts,
    getOnecontact,
    updatecontact,
    deletecontact,
} = require("../controllers/contact");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/auth");

//contact routes
router.route("/user/contact/create").post(isAuthenticatedUser, createcontact);

router.route("/user/contact/getAll").get(isAuthenticatedUser, getAllcontacts);
router.route("/user/contact/getOne").get(isAuthenticatedUser, getOnecontact);
router
    .route("/user/contact/update/:id")
    .put(isAuthenticatedUser, updatecontact);

router
    .route("/user/contact/delete/:id")
    .delete(isAuthenticatedUser, deletecontact);

module.exports = router;
