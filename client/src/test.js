getMonday = (d) => {
  let day = d.getDay(),
  diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

let searchDate = getMonday(new Date()).toISOString().split('T')[0] + 'T00:00:00Z'



console.log(x)
