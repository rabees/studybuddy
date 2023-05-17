let enrollmodel = require("../../models/Enrollment");
let groupmodel = require("../../models/Group");
let studentmodel = require("../../models/Student");
let express = require("express");
let router = express.Router();

router.get("/enrollments", (req, res, next) => {
  enrollmodel
    .find()
    .populate({ path: "student", model: "Student" })
    .populate({ path: "group", model: "groups", select: "groupName" })

    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      if (results) {
        return res.json(results);
      }
    });
});

router.get("/enrollmentbystudent", (req, res) => {
  enrollmodel
    .find({
      student: req.query.id
    })
    .populate({ path: "group", model: "groups" })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/checkenrollment", (req, res) => {
  enrollmodel
    .findOne({
      student: req.query.id,
      group: req.query.groupid
    })
    .populate({ path: "group", model: "groups", select: "groupName" })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/enroll/add", (req, res) => {
  console.log("req.body: ", req.body); // Log the request body
  if (!req.body) {
    console.log("Request body is missing");
    return res.status(400).send("request body is missing");
  }
  studentmodel.find({ email: req.body.student }, function(error, cat) {
    if (!error && cat && cat.length > 0) {
      console.log("Student model: ", cat);
      req.body.student = cat[0]._id;
    }
    groupmodel.find({ groupName: req.body.group }, function(error, cat) {
      if (!error && cat && cat.length > 0) {
        console.log("Group model: ", cat);
        req.body.group = cat[0]._id;
      }

      let model = new enrollmodel(req.body);
      model
        .save()
        .then(doc => {
          if (!doc || doc.length === 0) {
            console.log("Error saving the model: ", doc);
            return res.status(500).send(doc);
          }
          console.log("Successfully saved the model: ", doc);
          res.status(200).send(doc);
        })
        .catch(err => {
          console.log("Error saving the model: ", err);
          res.status(500).json(err);
        });
    });
  });
});





router.post("/enrollbystudent/add", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }

  let model = new enrollmodel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc);
      }
      res.status(200).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/enrollment", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  enrollmodel
    .findOneAndRemove({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
