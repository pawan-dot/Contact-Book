const mongoose = require("mongoose");
const validator = require("validator");
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter contact Name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    address: {
        type: String,
        required: [true, "Please Enter contact address"],
    },
    phone_No: {
        type: Number,
        required: [true, "Please Enter contact phone no."],
    },



    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("contact", contactSchema);

