const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Load instructor model for email exist checking
const keys = require("../../config/keys");
const Instructor = require("../../models/Instructor");
const Payment = require("../../models/Payment");
const passport = require("passport");
const stripe = require('stripe')('sk_test_51L2DnCDu7chjgqDrURqah25bZe30yxmbbbaheNn6MCsn06rJSK6l3PX6nBJbPNH2FH6Dm5yhbot0WzP9xGlOKgXp00ebfYc03f');

//Load input  validation
const validateInstructorRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// @route  GET   api/instructors/register
// @desc   Register instructors route
// @access Public

router.post("/instructors/register", (req, res) => {
  const { errors, isValid } = validateInstructorRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Instructor.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).then(instructor => {
    if (instructor) {
      if (instructor.email === req.body.email) {
        errors.email = "Email already exists";
      }
      if (instructor.username === req.body.username) {
        errors.username = "Username already exists";
      }
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newInstructor = new Instructor({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        role: req.body.role,
        city: req.body.city,
        rating: 0
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newInstructor.password, salt, (err, hash) => {
          if (err) throw err;
          newInstructor.password = hash;
          newInstructor
            .save()
            .then(instructor => res.json(instructor))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET   api/instructors/login
// @desc   Login instructors route => returning jwt token
// @access Public

router.post("/instructors/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find instructor by email
  Instructor.findOne({ email }).then(instructor => {
    if (!instructor) {
      errors.email = "Instructor not found";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, instructor.password).then(isMatch => {
      if (isMatch) {
        //Instructor Match

        //Create jwt payload
        const payload = {
          id: instructor.id,
          username: instructor.username,
          first_name: instructor.first_name,
          last_name: instructor.last_name,
          avatar: instructor.avatar,
          role: instructor.role,
          rating: instructor.rating
        };
        //Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              first_name: instructor.first_name,
              last_name: instructor.last_name
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET   api/instructors/current
// @desc   Return/retrive the current instructor from the token
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.instructor);
    res.json({
      id: req.instructor.id,
      first_name: req.instructor.first_name,
      email: req.instructor.email
    });
  }
);

router.get("/instructors", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Instructor.find()
      .then(doc => {
         // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
          res.setHeader('Content-Range', 'instructors 0-5/5');
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.post('/instructor', (req, res)=>{
  //req.body
  if(!req.body){
      return res.status(400).send("request body is missing")
  }

  let model=new Instructor(req.body)
  model.save()
  .then(doc=>{
      if(!doc ||doc.length===0){
          return res.status(500).send(doc)
      }
      res.status(200).send(doc)

  })
  .catch(err=>{
      res.status(500).json(err)
  })
});

router.get('/instructor', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Instructor.findOne({
      _id: req.query.id
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.put('/instructor/', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Instructor.findOneAndUpdate({
      _id: req.query.id
  }, req.body,{
      new:true
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.delete('/instructor', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Instructor.findOneAndRemove({
      _id: req.query.id
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      });
});

// Payment
router.post('/payment', async (req, res) => {
  try {
    const { amount, token, description, userId } = req.body;

    const charge = await stripe.charges.create({
      amount: amount,
      currency: 'usd',
      description: description,
      source: token.id
    });

    const payment = new Payment({
      amount: amount,
      description: description,
      stripeChargeId: charge.id,
      instructor: userId
    });

    await payment.save();

    res.json({ success: true, charge, payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
