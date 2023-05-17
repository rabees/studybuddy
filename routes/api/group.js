// let path=require('path');
let groupmodel = require("../../models/Group");
let instructormodel = require("../../models/Instructor");
let catmodel = require("../../models/Category");
let express = require("express");
let router = express.Router();

router.post("/group/add", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).json("request body is missing");
  }
  console.log(req.body);
  // let model=new groupmodel(req.body)
  // function(err, model){
  //     if(!err, model){
  catmodel.find({ categoryName: req.body.category }, function(error, cat) {
    if (!error && cat) {
      console.log("Cat printed" + cat);
      req.body.category = cat[0]._id;
    }
    console.log("Instructor Id" + req.body.instructor);
    const model = new groupmodel(req.body);
    model
      .save()
      .then(doc => {
        if (!doc || doc.length === 0) {
          return res.status(500).send(doc);
        }
        res.status(200).json(doc);
        console.log("Doc Printed" + doc);
        console.log("Model Printed" + model);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
});

router.get("/groups", (req, res, next) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  groupmodel
    .find()
    .populate({ path: "category", model: "category" })
    .populate({ path: "instructor", model: "Instructor" })

    .exec(function(err, results) {
      if (err) {
        return next(err);
      }
      if (results) {
        return res.json(results);
      }
    });
});

router.get("/group", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  groupmodel
    .findOne({
      _id: req.query.id
    })

    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//get groups by instructor id
router.get("/groupbyinstructor", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  groupmodel
    .find({
      instructor: req.query.id
    })

    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/group/", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  groupmodel
    .findOneAndUpdate(
      {
        _id: req.query.id
      },
      req.body,
      {
        new: true
      }
    )
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/group", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  groupmodel
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
