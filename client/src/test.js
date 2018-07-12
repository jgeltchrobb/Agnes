
const m = new Date("July 2 2018")

const x = new Date(m.setDate(m.getDate() + 1))

console.log(x.getDate())
