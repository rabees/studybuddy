export const bookAppointment = (appointment) => {
    return fetch(`/api/appointment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => console.log(err));
};

export const getSlots = (date) => {
  console.log(date)
  return fetch(`/api/slot?slotDate=${date}`, {
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
      }
  })
  .then((response) => {
    return response.json();
  })
  .catch((err) => console.log(err));
};

export const addSlotToStorage = (slotObj) => {
  let appointment = {
    "name": "",
    "email" : "",
    "phone" : "",
    "slots" : slotObj
  };
  if (typeof window !== undefined) {
    localStorage.setItem("appointment", JSON.stringify(appointment));
  }
};

export const getAppointmentFromStorage = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("appointment")) {
      return JSON.parse(localStorage.getItem("appointment"));
    }
  }
};
