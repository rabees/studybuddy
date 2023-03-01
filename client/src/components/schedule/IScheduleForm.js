import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookAppointment, getAppointmentFromStorage } from "./helper/coreapicalls";
import NavBar from "../NavBar";

const IScheduleForm = () => {

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

  const {name, email, phone, slots, error} = values;

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
          // window.history.back();
      }
      setTimeout(() => {
        window.location.reload();
        window.history.back();
      }, 1300);
    })
    .catch(console.log("Error in booking the slot."));
  };

  const appointmentForm = () => {
    return (
      <div>
        <NavBar />
        <div className="container">
        <br />
        <Link to="/ischedule" className="btn btn-light">
                  Go Back
                </Link>
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto text-center">
            <h1 className="h3 mb-3 font-weight-normal text-center">Edit Your Non-Availability</h1>
            <div className="form-group text-left">
          <form>
            <div className="form-group">
              <label className="my-2 text-dark">Reason:</label>
              <input className="form-control" onChange={handleChanges("name")} type="text" value = {name} />
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
    <div className="alert alert-success" style={{display: error ? "" : "none"}}>
      Successfully disabled the slot!
    </div>
    </div>
    </div>
    );
  };

  return (
    <div>
      {appointmentForm()}
      {successMessage()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </div>
  );
};

export default IScheduleForm;
