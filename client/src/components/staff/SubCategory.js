import React from 'react'
// import Link from 'react-router-dom'
import Cell from './Cell'

const SubCategory = (props) => {
  let categories = []
  for (const key of Object.keys(props)) {
    categories.push(props[key])
  }
  return (
    categories.map((category) => {
      return (
        <Cell {...category} />
      )
    })
  )
}
export default SubCategory

