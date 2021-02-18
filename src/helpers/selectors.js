export function getAppointmentsForDay(state, day) {

  const appArr = state.days.filter(r => r.name === day);
  if (!appArr.length) {
    return []
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