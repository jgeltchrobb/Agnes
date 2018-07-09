import React from 'react'

const Cell = (props) => {
  return (
    <div className="cell" >
      <h4>{props.name}</h4>
      {props.hours}
    </div>
  )
}

export default Cell