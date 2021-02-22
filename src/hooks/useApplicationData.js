import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const updateState = function () {
    const urlDays = `/api/days`;
    const urlAppointments = `/api/appointments`;
    const urlInterviewers = `/api/interviewers`;

    return Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviewers)
    ])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        console.log("all", all);

        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  };

  // document ready
  useEffect(() => {
    updateState();
  }, []);

  // Interviews: Create, Delete, Edit:
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview })
      .then(() => {
        setState({ ...state, appointments });
      })
      .then(() => { return updateState(); })
      .catch(error => console.log(error));
  }

  // deleting interviews
  function cancelInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const url = `/api/appointments/${id}`;
    return axios.delete(url, { interview })
      .then(() => {
        setState({ ...state, appointment });
      })
      .then(() => { return updateState(); })
      .catch(error => console.log(error));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}