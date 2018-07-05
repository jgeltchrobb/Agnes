// This is just for me playing with functions to access / alter the data,
// hence the console.log() at the bottom.  

const week = {
  date: "2018-07-2",
  staff:
  [
    {
      staffID: 1, shifts:
      [
        {
          day: 'monday',
          date: "2018-07-2",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 9,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 15,
            flag: false
          }
        },
        {
          day: 'tuesday',
          date: "2018-07-3",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 7,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 17,
            flag: false
          }
        },
        {
          day: 'wednesday',
          date: "2018-07-4",
          shiftCategory: "Kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'thursday',
          date: "2018-07-5",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'friday',
          date: "2018-07-6",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'saterday',
          date: "2018-07-7",
          shiftCategory: "Kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day:'sunday',
          date: "2018-07-8",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        }, // end of saterday
      ] // end of shifts

    }, //end of staff member

    {
      staffID: 2, shifts:
      [
        {
          day: 'monday',
          date: "2018-07-2",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 9,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 15,
            flag: false
          }
        },
        {
          day: 'tuesday',
          date: "2018-07-3",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 7,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 17,
            flag: false
          }
        },
        {
          days: 'wednesday',
          date: "2018-07-4",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          days: 'thursday',
          date: "2018-07-5",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'friday',
          date: "2018-07-6",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'saterday',
          date: "2018-07-7",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'sunday',
          date: "2018-07-8",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

    {
      staffID: 3, shifts:
      [
        {
          day: 'monday',
          date: "2018-07-2",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 9,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 15,
            flag: false
          }
        },
        {
          day: 'tuesday',
          date: "2018-07-3",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 7,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 17,
            flag: false
          }
        },
        {
          day: 'wednesday',
          date: "2018-07-4",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'thursday',
          date: "2018-07-5",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'friday',
          date: "2018-07-6",
          shiftCategory: "floor",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'saterday',
          date: "2018-07-7",
          shiftCategory: "room",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        },
        {
          day: 'sunday',
          date: "2018-07-8",
          shiftCategory: "kitchen",
          start: {
            rostered: 8,
            actual: 8,
            flag: false
          },
          finish: {
            rostered: 16,
            actual: 16,
            flag: false
          }
        }, // end of saterday
      ] // end of shifts
    }, // end of staff member

  ]
}

console.log(week.staff[2].shifts[1].day)
