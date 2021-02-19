export function getAppointmentsForDay(state, day) {
  const appArr = state.days.filter(r => r.name === day);
  if (!appArr.length) {
    return [];
  }
  for (let i of appArr) {
    let resultArr = [];
    let array = i.appointments;
    array.forEach(function (num) {
      let arr = state.appointments[num];
      resultArr.push(arr);
    });
    return resultArr;
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewer = state.interviewers[interview.interviewer];
  return { ...interview, interviewer };
}
