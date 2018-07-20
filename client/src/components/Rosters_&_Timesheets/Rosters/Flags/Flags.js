import React, { Component } from 'react'
import Flag from './Flag'

class Flags extends Component {

  componentDidMount() {
  }

  render() {
      // console.log(this.props.flags)

    return (
      <div>
        {
          this.props.flags.map((flag) => {
            return (
              <Flag staffID={ flag.staffID }
                    date={ flag.date }
                    rostered={ flag.rostered }
                    actual={ flag.actual }
                    fetchFlagsData={ this.fetchFlagsData }
                    users={ this.props.users }
              />
            )
          })
        }
      </div>
    )
  }
}

export default Flags
