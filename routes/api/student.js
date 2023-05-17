const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//Load student model for email exist checking
const keys = require("../../config/keys");
const Student = require("../../models/Student");
const Payment = require("../../models/Payment");
const passport = require("passport");
const nodemailer = require("nodemailer");
const stripe = require('stripe')('sk_test_51L2DnCDu7chjgqDrURqah25bZe30yxmbbbaheNn6MCsn06rJSK6l3PX6nBJbPNH2FH6Dm5yhbot0WzP9xGlOKgXp00ebfYc03f');

//Load input  validation
const validateStudentRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000/",
		failureRedirect: "/login/failed",
	})
);

// @route  GET   api/students/register
// @desc   Register students route
// @access Public

router.post("/students/register", (req, res) => {
  const { errors, isValid } = validateStudentRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Student.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).then(student => {
    if (student) {
      if (student.email === req.body.email) {
        errors.email = "Email already exists";
      }
      if (student.username === req.body.username) {
        errors.username = "Username already exists";
      }
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //Rating
        d: "mm" //Default
      });

      const newStudent = new Student({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        role: req.body.role,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
          if (err) throw err;
          newStudent.password = hash;
          newStudent
            .save()
            .then(student => res.json(student))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET   api/students/login
// @desc   Login students route => returning jwt token
// @access Public

router.post("/students/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find student by email
  Student.findOne({ email }).then(student => {
    if (!student) {
      errors.email = "Student not found";
      return res.status(404).json(errors);
    }
    //check password
    bcrypt.compare(password, student.password).then(isMatch => {
      if (isMatch) {
        //Student Match

        //Create jwt payload
        const payload = {
          id: student.id,
          username: student.username,
          first_name: student.first_name,
          last_name: student.last_name,
          avatar: student.avatar,
          role: student.role
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
              first_name: student.first_name,
              last_name: student.last_name
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

// @route  GET   api/students/current
// @desc   Return/retrive the current student from the token
// @access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json(req.student);
    res.json({
      id: req.student.id,
      first_name: req.student.first_name,
      email: req.student.email
    });
  }
);

router.get("/students", (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Student.find()
      .then(doc => {
         // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
          res.setHeader('Content-Range', 'students 0-5/5');
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.post('/student', (req, res)=>{
  //req.body
  if(!req.body){
      return res.status(400).send("request body is missing")
  }

  let model=new Student(req.body)
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

router.get('/student', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Student.findOne({
      _id: req.query.id
  })
      .then(doc => {
          
          res.json(doc)
          
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.put('/student/', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Student.findOneAndUpdate({
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

router.delete('/student', (req, res) => {
  //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  Student.findOneAndRemove({
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
      student: userId
    });

    await payment.save();

    res.json({ success: true, charge, payment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

const crypto = require("crypto");

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user in the database based on the provided email
    const user = await Student.findOne({ email });

    if (!user) {
      // User with the provided email does not exist
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Set the generated reset token and its expiration time for the user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save the updated user data
    await user.save();

    // Create a Nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      secureConnection: false,
      auth: {
        user: "f32c204a5e9f7d",
        pass: "36953bf774b603"
      },
      tls: {
          ciphers:'SSLv3'
      }
    });

    // Create the email message
    const mailOptions = {
      from: "rabees517@gmail.com",
      to: user.email,
      subject: "Password Reset",
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n`
        + `Please click on the following link, or paste it into your browser to complete the process:\n\n`
        + `/reset/${resetToken}\n\n`
        + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return a success response
    res.json({ message: "Password reset token generated and emailed to the user" });
  } catch (error) {
    console.error("Error generating password reset token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
