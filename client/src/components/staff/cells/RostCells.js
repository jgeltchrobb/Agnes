import React from 'react'

const RostCells = (props) => {
  const catArr = [{Ordinary: 'Ordinary'},
        {Sat: 'Sat'},
        {Sun: 'Sun'},
        {night: 'Night'}]

  for (let key of Object.keys(props)) {
    for (let obj of catArr) {
      console.log(obj[key])
      if (key === obj) {
        return (
          <div className="cell" >
            <h3>{obj[key]}</h3>
            {/* <h4>{props.rostered}</h4> */}
          </div>
      )
      } else {
        return ''
      }
    }
  }
}

export default RostCells