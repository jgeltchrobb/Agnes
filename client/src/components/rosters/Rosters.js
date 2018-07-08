import React, { Component } from 'react'
import Roster from './Roster'
import Flags from './Flags'



class Rosters extends Component {
  constructor(props) {
    super(props)


  }

  render() {
    const { staff } = this.props
    return (
      <div>

        <div>

          <Roster staff={staff} />

        </div>


        <div>

          <Flags staff={staff} />

        </div>

      </div>
    )
  }
}



export default Rosters
