const express = require("express");
const router = express.Router();
const groupmodel = require("../../models/Group.js");
// const fileUpload = require('express-fileupload');
//mongoose
const mongoose = require("mongoose");
var multer = require("multer");
let resourcemodel = require("../../models/Resource.js");

/*Get videos*/
router.get("/resources", function(req, res) {
  resourcemodel
    .find({
      group: req.query.id
    })
    .populate({ path: "group", model: "groups", select: "groupDescription" })
    .then(doc => {
      // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
      //res.setHeader('Content-Range', 'users 0-5/5');
      res.json(doc);
      // console.log("populated doc:" + doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  // res.send('this is get route upload');
  // res.render('index', {title: 'Upload file'});
});

/* POST videos*/
router.post("/resources/localupload", function(req, res) {
  groupmodel.find({ groupName: req.body.group }, function(error, cat) {
    if (error) {
      console.error(error);
      return res.status(500).send("An error occurred while trying to retrieve the group information.");
    }
    if (cat.length > 0) {
      req.body.group = cat[0]._id;
    } else {
      return res.status(400).send("No group was found with the specified name.");
    }
    console.log(req.files);
    if (req.files != undefined) {
      let imagefile = req.files.file;
      imagefile.mv(`Client/public/assets/${req.files.file.name}`);
      if (imagefile) {
        req.body.videoLink = "/assets/" + imagefile.name;
      }
    } else {
      console.log(req.body.videoLink);
    }
    const upload = new resourcemodel(req.body).save();
    return res.status(200).send("The resource was successfully uploaded.");
  });
});

router.post("/resources/youtubeupload", (req, res) => {
  //req.body
  if (!req.body) {
    return res.status(400).send("request body is missing");
  }

  let model = new resourcemodel(req.body);
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

module.exports = router;
