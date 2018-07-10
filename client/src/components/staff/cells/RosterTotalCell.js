import React from 'react'

const RosterTotalCell = (props) => {
  return (
    <div className="cell" onClick={props.handleClick} >
      <h4>Total</h4>
      {props.rosteredTotal}
    </div>
  )
}

export default RosterTotalCell