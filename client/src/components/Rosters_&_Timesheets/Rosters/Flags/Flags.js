import React, { Component } from 'react'
import Flag from './Flag'
import '../../../../stylesheets/Flags.css'

class Flags extends Component {

  componentDidMount() {
  }

  render() {

    const { fetchFlagsData, users } = this.props

    return (
      <div class="flags-container">
        {
          this.props.flags.map((flag) => {
            return (
              <Flag flagID= { flag._id }
                    staffID={ flag.staffID }
                    date={ flag.date }
                    rostered={ flag.rostered }
                    actual={ flag.actual }
                    fetchFlagsData={ fetchFlagsData }
                    users={ users }
              />
            )
          })
        }
      </div>
    )
  }
}

export default Flags
