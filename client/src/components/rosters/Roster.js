import React, { Component } from 'react'
import ShiftRow from './ShiftRow'


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
                <ShiftRow staffMember={staffMember} />
              )
            })
          }
      </div>
    )
  }
}

export default Roster
