import React, { Component } from 'react'
import ColumnHeading from './ColumnHeading'
import DateBar from './DateBar'
import Nav from './Nav'

class Header extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    const { weekDate, nextWeek, previousWeek, columnHeading } = this.props

    return (
      <div>

        <div>
          <ColumnHeading columnHeading={columnHeading}/>
        </div>

        <div>

          <div>
            <Nav previousWeek={previousWeek} />
          </div>

          <div>
            <DateBar weekDate={weekDate}/>
          </div>

          <div>
            <Nav nextWeek={nextWeek} />
          </div>

        </div>

      </div>
    )
  }
}

export default Header
