import React, { Component } from 'react'
import Rosters from './Rosters'
import Flags from './Flags'

class RostersPage extends Component {
  constructor(props) {
    super(props)

  }

  render() {

    const flagsContainerStyle = {
      width: '20%',
      height: '100%',
    }

    return (
      <div>

        <div style={flagsContainerStyle}>
          <Flags />
        </div>

        <div>
          <Rosters />
        </div>

      </div>

    )
  }
}

export default RostersPage
