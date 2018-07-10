import React from 'react'

const TotalCell = (props) => {
  return (
    <div className="cell" onClick={props.handleClick} >
      <h4>Total</h4>
      {props.total}
    </div>
  )
}

export default TotalCell