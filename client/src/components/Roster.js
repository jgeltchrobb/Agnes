import React, { Component } from 'react'
import StaffMemberShifts from './StaffMemberShifts'

class Roster extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { staff } = this.props

    return (
      <div>
        {/* Add column headings here: M,T,W,TH,F,S,S */}
          {
            staff.map((staffMember) => {
              return (
                <StaffMemberShifts
                  staffMember={staffMember}
                />
              )
            })
          }
      </div>
    )
  }
}

export default Roster
