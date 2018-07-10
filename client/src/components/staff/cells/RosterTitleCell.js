import React from 'react'

const RosterTitleCell = (props) => {
  return (
    <div className="cell" onClick={props.handleClick} >
      <h4>Rostered</h4>
    </div>
  )
}

export default RosterTitleCell