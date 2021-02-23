import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviewers = `/api/interviewers`;

    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviewers)

    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      console.log("all", all);

      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const getSpotsForDay = function (day, appointments) {
    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };

  const updateSpots = function (dayName, days, appointments) {
    const day = days.find((d) => d.name === dayName);
    const spots = getSpotsForDay(day, appointments);
    return days.map((item) =>
      item.name === dayName ? { ...day, spots } : item
    );
  };

  // Interviews: Create, Edit:
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview })
      .then(() => {
        const days = updateSpots(state.day, state.days, appointments)
        setState({ ...state, appointments, days });
      });
  };

  // Deleting interviews
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;
    return axios.delete(url)
    .then(() => {
      const days = updateSpots(state.day, state.days, appointments)
      setState({ ...state, appointments, days });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
