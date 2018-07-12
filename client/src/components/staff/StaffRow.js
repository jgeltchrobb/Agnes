import React from 'react'
import SubCategory from './SubCategory'

class StaffRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return this.props.staffData.map((staff) => {
      return (
        <div className="staffrow" >
          <SubCategory {...staff} revealed={this.props.revealed} handleClick={this.toggleHandler} passTotal={this.props.passTotal}/>
        </div>
      )
    })
  }
}

export default StaffRow
