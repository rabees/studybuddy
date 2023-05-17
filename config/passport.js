// Create strategy
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const Instructor = mongoose.model("Instructor");
const Admin = mongoose.model("Admin");
const keys = require("../config/keys");

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Promise.all([
        Student.findById(jwt_payload.id),
        Instructor.findById(jwt_payload.id),
        Admin.findById(jwt_payload.id)
      ])
        .then(([student, instructor, admin]) => {
          if (student) {
            return done(null, student);
          }
          if (instructor) {
            return done(null, instructor);
          }
          if (admin) {
            return done(null, admin);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
