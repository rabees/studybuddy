const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateStudentRegisterInput(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "First Name must be between 2 and 30 characters";
  }

  if (!data.first_name) {
    errors.first_name = "First Name is required";
  } else if (!Validator.isAlpha(data.first_name)) {
    errors.first_name = "First Name must contain only letters";
  }
  
  if (!data.last_name) {
    errors.last_name = "Last Name is required";
  } else if (!Validator.isAlpha(data.last_name)) {
    errors.last_name = "Last Name must contain only letters";
  }
  
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "Last Name must be between 2 and 30 characters";
  }
  
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (!data.username) {
    errors.username = "Username is required";
  } 

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = function validateInstructorRegisterInput(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "First Name must be between 2 and 30 characters";
  }

  if (!data.first_name) {
    errors.first_name = "First Name is required";
  } else if (!Validator.isAlpha(data.first_name)) {
    errors.first_name = "First Name must contain only letters";
  }
  
  if (!data.last_name) {
    errors.last_name = "Last Name is required";
  } else if (!Validator.isAlpha(data.last_name)) {
    errors.last_name = "Last Name must contain only letters";
  }
  
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "Last Name must be between 2 and 30 characters";
  }
  
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (!data.username) {
    errors.username = "Username is required";
  } 

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = function validateAdminRegisterInput(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "First Name must be between 2 and 30 characters";
  }

  if (!data.first_name) {
    errors.first_name = "First Name is required";
  } else if (!Validator.isAlpha(data.first_name)) {
    errors.first_name = "First Name must contain only letters";
  }
  
  if (!data.last_name) {
    errors.last_name = "Last Name is required";
  } else if (!Validator.isAlpha(data.last_name)) {
    errors.last_name = "Last Name must contain only letters";
  }
  
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "Last Name must be between 2 and 30 characters";
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};