const express = require("express");
require("dotenv");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
const app = express();


app.use(express.json());
app.use(cookieParser());


//fetch data from the request
app.use(bodyParser.urlencoded({ extended: false }));





// Route Imports
const contact = require("./routes/contact");
const user = require("./routes/user");

app.use("/api", contact);
app.use("/api", user);



module.exports = app;





