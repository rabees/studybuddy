import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookAppointment, getAppointmentFromStorage } from "./helper/coreapicalls";
import NavBar from "../NavBar";
import { useHistory } from "react-router-dom";

const ScheduleForm = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    slots: {
        slotTime: "",
        slotDate: ""
    },
    error: "",
    success: false
  });

  const {name, email, phone, slots, error, success} = values;

  const handleChanges = name => event => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  useEffect(() => {
    let appointment = getAppointmentFromStorage();
    appointment.error = "";
    appointment.success = false;
    setValues(appointment);
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    if (name && email && phone) {
      bookAppointment({name, email, phone, slots})
        .then(data => {
          if (data.error) {
            setValues({...values, error: data.error, success: false});
          } else {
            setValues({
                name: "",
                email: "",
                phone: "",
                slots: {
                    slotTime: "",
                    slotDate: ""
                },
                error: "",
                success: true
              });
              history.push('/payment');
          }
          setTimeout(() => {
            window.location.reload();
            // window.history.back();
          }, 1300);
        })
        .catch(console.log("Error in booking the slot."));
    } else {
      setValues({...values, error: "Please enter all fields", success: false});
    }
  };
  

  const appointmentForm = () => {
    return (
      <div>
        <NavBar />
        <div className="container">
        <br />
        <Link to="/schedule" className="btn btn-light">
                  Go Back
                </Link>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto text-center">
            <h1 className="h3 mb-3 font-weight-normal text-center">Book Your Slot</h1>
            <div className="form-group text-left">
          <form>
            <div className="form-group">
              <label className="my-2 text-dark">Name:</label>
              <input className="form-control" onChange={handleChanges("name")} type="text" value = {name} />
            </div>
            <div className="form-group">
              <label className="my-2 text-dark">Email:</label>
              <input className="form-control" onChange={handleChanges("email")} type="email" value = {email} />
            </div>
            <div className="form-group">
              <label className="my-2 text-dark">Phone:</label>
              <input className="form-control" onChange={handleChanges("phone")} type="text" value = {phone} />
            </div>
            <button onClick={onSubmit} className="my-3 form-control btn btn-primary btn-block">Submit</button>
          </form>
        </div>
      </div>
      </div>
      </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
      Booked the slot successfully
    </div>
    </div>
    </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
      {error}
    </div>
    </div>
    </div>
    );
  };

  return (
    <div>
      {appointmentForm()}
      {successMessage()}
      {errorMessage()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </div>
  );
};

export default ScheduleForm;
