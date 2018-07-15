import React from 'react'

const RosterTotalCell = (props) => {
  return (
    <div onClick={props.handleClick} >
      {/* <h4>Total</h4> */}
      {props.rostered}
    </div>
  )
}

export default RosterTotalCell