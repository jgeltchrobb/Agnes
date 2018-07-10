import React from 'react'

const CatCell = (props) => {
  return (
    <div className="cell" onClick={props.handleClick} >
      <h4>{props.name}</h4>
      {props.standard}
    </div>
  )
}

export default CatCell