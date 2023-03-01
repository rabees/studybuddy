import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getSlots, addSlotToStorage } from "./helper/coreapicalls";
import { Link } from "react-router-dom";
import NavBar from "../NavBar";

const Schedule = () => {
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [slots, setSlots] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState("");

  const loadAllSlots = () => {
    getSlots(
      `${appointmentDate.getYear() + 1900}-${(
        "0" +
        (appointmentDate.getMonth() + 1)
      ).slice(-2)}-${("0" + appointmentDate.getDate()).slice(-2)}`
    ).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        let slotTemp = [
          { time: "09:00 am - 10:00 am", available: true },
          { time: "10:00 am - 11:00 am", available: true },
          { time: "11:00 am - 12:00 pm", available: true },
          { time: "12:00 pm - 01:00 pm", available: true },
          { time: "01:00 pm - 02:00 pm", available: true },
          { time: "02:00 pm - 03:00 pm", available: true },
          { time: "03:00 pm - 04:00 pm", available: true },
        ];
        setSlots(
          slotTemp.map((s) => {
            for (const item of data) {
              if (s.time === item.slotTime) {
                s.available = false;
              }
            }
            return s;
          })
        );
      }
    });
  };

  useEffect(() => {
    loadAllSlots();
    // eslint-disable-next-line
  }, [appointmentDate]);

  const handleSlotClick = (index) => {
    const updatedSlots = [...slots];
    updatedSlots[index].available = false;
    setSlots(updatedSlots);
  };

  const slotsList = () => {
    // Check if all slots are booked
    const allBooked = slots.every((slot) => !slot.available);
  
    if (allBooked) {
      return <p>No slots available for today.</p>;
    } else {
      return (
        <div className="list-group">
          {slots.map((slot, index) => {
            if (slot.available) {
              return (
                <Link
                  to="/schedule/book"
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    handleSlotClick(index);
                    addSlotToStorage({
                      slotTime: slot.time,
                      slotDate: `${appointmentDate.getYear() + 1900}-${(
                        "0" + (appointmentDate.getMonth() + 1)
                      ).slice(-2)}-${("0" + appointmentDate.getDate()).slice(-2)}`,
                    });
                  }}
                >
                  {slot.time}
                </Link>
              );
            } else {
              return (
                <button
                  className="list-group-item list-group-item-action bg-warning disabled"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  {slot.time}
                </button>
              );
            }
          })}
        </div>
      );
    }
  };
  

  return (
    <div>
        <NavBar />
        <div className="container">
  <div className="row">
    <div className="col-md-3 mt-5 mx-auto text-center">
      <h1 className="h3 mb-3 font-weight-normal text-center">Select a Date</h1>
      <div className="form-group text-center">
        <DatePicker
          selected={appointmentDate}
          onChange={(date) => setAppointmentDate(date)}
        />
      </div>
      {slotsList()}
      <br />
      {/* <div className="text-left">
        <p>*Click on a slot to make it unavailable</p>
      </div> */}
    </div>
  </div>
</div>
</div>

  );
};

export default Schedule;
