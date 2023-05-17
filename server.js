const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
// const users = require("./routes/api/users");
const group = require("./routes/api/group");
const category = require("./routes/api/category");
const enroll = require("./routes/api/enrollRoute");
const role = require("./routes/api/role");
const resource = require("./routes/api/resource");
const fileUpload = require('express-fileupload');
var multer = require('multer')
var cors = require('cors');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const appointmentRoutes = require("./routes/api/appointment");
const instructor = require("./routes/api/instructor");
const student = require("./routes/api/student");
const admin = require("./routes/api/admin");

const app = express();

// Db Config
const db = require("./config/keys").mongoURI;

//Passport middileware
passport.use(passport.initialize());

app.use(
	cookieSession({
		name: "session",
		keys: ["studybuddy"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

//passport config
require("./config/passport")(passport);
app.use(fileUpload());

//Body Parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:1000000}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

//Connect to mongodb through mongoose
mongoose
  .connect(db,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));

//Use routes
app.use(cors());
app.options("*", cors()); 
app.use(student);
app.use(admin);
app.use(instructor);
app.use(group);
app.use(category);
app.use(resource);
app.use(enroll);
app.use(role);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api", appointmentRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on Port ${port}`));
