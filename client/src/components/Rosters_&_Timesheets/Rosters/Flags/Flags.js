import React, { Component } from 'react'
import Flag from './Flag'
import '../../../../stylesheets/Flags.css'

class Flags extends Component {

  componentDidMount() {
  }

  render() {

    return (
      <div class="flags-container">
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
