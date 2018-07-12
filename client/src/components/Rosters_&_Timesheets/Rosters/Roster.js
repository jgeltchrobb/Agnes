import React, { Component } from 'react'
import ShiftRow from './ShiftRow'


class Roster extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount = () => {

  }

  render() {
    const { staff, weekDate } = this.props

    return (
      <div>

        <div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>

        <div>
          {/* Add column headings here: M,T,W,TH,F,S,S */}
            {
              staff.map((staffMember) => {
                return (
                  <ShiftRow staffMember={staffMember}
                            weekDate={weekDate}
                  />
                )
              })
            }
        </div>

      </div>

    )
  }
}

export default Roster
