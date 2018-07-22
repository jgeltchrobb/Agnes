import React, { Component } from 'react'
import Pin from './office-clock/Pin'
import ClockButton from './mobile/ClockButton'

class Clock extends Component {


  componentDidMount() {

  }

  render() {

    // if (this.props.role === 'staff') {

      return (
        <div className='mobile-clock'>

          <ClockButton week={this.props.week} staffID={ this.props.staffID } />
        </div>
      )
    // }

    // if (this.props.role === 'office clock') {
    //
    //   return (
    //     <div className='mobile-clock'>
    //       <Pin week={this.props.week} user={this.props.user} />
    //     </div>
    //   )
    // }

  }
}

export default Clock
