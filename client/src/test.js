
let x = new Date("July 15 2018")


// let y = x

let y = new Date(x)
//Object.assign({x})


y.setDate(y.getDate() + 1)
//
let w = x.getDate()

console.log(w)
