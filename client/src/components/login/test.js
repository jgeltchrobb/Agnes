let answer = JSON.stringify( {weekID: "5b4a094725a0c75ad21afb8b", shift: {
  
    date: new Date("July 2 2018"),
    shiftCategory: "floor",
    start: {
      rostered: new Date("July 2 2018 8:00"),
      actual: new Date("July 2 2018 9:00"),
      timesheet: new Date("July 2 2018 9:00"),
      flag: false
    },
    finish: {
      rostered: new Date("July 2 2018 16:00"),
      actual: new Date("July 2 2018 15:00"),
      timesheet: new Date("July 2 2018 15:00"),
      flag: false
    }
}
})

console.log(answer)