import React from 'react'
import SubCategory from './SubCategory'
class StaffRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totals: ''
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      this.setState({totals: this.props.rosteredTotals})
    }
  }

  render() {
    console.log(this.props, 'PROPS')
    return this.props.staffData.map((staff) => {
      return (
        <div className="staffrow" >
          <SubCategory {...staff} totals={this.state.totals} revealed={this.props.revealed} handleClick={this.toggleHandler} passTotal={this.props.passTotal} />
        </div>
      )
    })
  }
}

export default StaffRow
