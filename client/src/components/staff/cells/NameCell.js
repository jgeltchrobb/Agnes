import React from 'react'

const NameCell = (props) => {
  return (
    <div className="cell" onClick={props.handleClick} >
      <h4>{props.staff}</h4>
    </div>
  )
}

export default NameCell