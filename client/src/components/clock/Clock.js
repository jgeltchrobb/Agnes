import React, { Component } from 'react'
import ClockButton from './ClockButton'
import KeyPad from './office-clock/KeyPad'

class Clock extends Component {


  componentDidMount() {

  }

  render() {
    const { week, staffID, api } = this.props

    // if (this.props.role === 'staff') {
    //
    //   return (
    //     <div className='mobile-clock'>
    //
    //       <ClockButton  week={ week }
    //                     staffID={ staffID }
    //                     api={ api }
    //       />
    //
    //     </div>
    //   )
    // }

    // if (this.props.role === 'office clock') {

      return (
        <div className='office-clock'>

          <div>
            Enter Pin and then press Clock In/Out
          </div>

          <div>
            <KeyPad />
          </div>

          <ClockButton  week={ week }
                        staffID={ staffID }
                        api={ api }
          />

        </div>
      )
    // }

  }
}

export default Clock
