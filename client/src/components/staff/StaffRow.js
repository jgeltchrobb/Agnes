import React from 'react'
import SubCategory from './SubCategory'

class StaffRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props,
    }
  }
  
  render() {
    return this.state.data.staffData.map((staff) => {
      return (
        <div className="staffrow" >
          <SubCategory {...staff} revealed={this.props.revealed} handleClick={this.toggleHandler} />
        </div>
      )
    })
  }
}

export default StaffRow
