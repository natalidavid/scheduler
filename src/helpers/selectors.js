export function getAppointmentsForDay(state, day) {
  //find - only 1 element
  const foundDay = state.days.find(days => days.name === day);

  //as soon as falsy case hits, we are returning it, else truthy
  if (state.days.length === 0 || !foundDay === undefined) {
    return [];
  }
  //map takes param, individual items, does something with it + return
  // two functions here, map & the arrow functions:
  return foundDay.appointments.map((id) => state.appointments[id]);
}

export function getInterview(state, interview) {
  //arr - iterate, but objects - look up keys!
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}
