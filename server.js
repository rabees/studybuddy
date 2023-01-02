const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const role = require("./routes/api/role");
const fileUpload = require('express-fileupload');
var multer = require('multer')
var cors = require('cors');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const cookieSession = require('cookie-session');


const app = express();

// Db Config
const db = require("./config/keys").mongoURI;

//Passport middileware
passport.use(passport.initialize());

//passport config will in
require("./config/passport")(passport);
app.use(fileUpload());
//Body Parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:1000000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

//Connect to mongodb through mongoose
mongoose
  .connect(db,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

app.use(cookieSession({
  name: 'session',
  keys: ['studybuddy'],
  maxAge: 24 * 60 * 60 * 100,
}));

//Use routes
app.use(cors());
app.options("*", cors()); 
app.use(users);
app.use(role);
app.use("/api/profile", profile);
app.use('/api/posts', posts);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
