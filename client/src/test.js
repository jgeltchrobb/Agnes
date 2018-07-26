const weekDate = new Date('2018-07-29')

for (let i = 0; i < 7; i++) {

  var dateCopy = new Date()

  // console.log(weekDate.getDate() + i)

  dateCopy.setDate(weekDate.getDate() + i)

  console.log(dateCopy.getDate())

}
