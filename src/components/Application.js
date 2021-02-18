import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";
import "components/Appointment";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = [];

  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   return setState(currentState => ({ ...currentState, days }));
  // };

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

  // axios.get(url).then(response => setDays(response.data));

  const appointments = getAppointmentsForDay(state, state.day)

  const mappedApts = appointments.map(app => {
    return (
      <Appointment
        key={app.id}
        {...app}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedApts}
        <Appointment
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
};
