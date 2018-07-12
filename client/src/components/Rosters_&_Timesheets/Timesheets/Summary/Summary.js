import React, { Component } from 'react'
import TotalsRow from '../Common/TotalsRow'
import Name from '../Common/Name'



class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }

  }

  render() {
    const { totalsRows, users, displayCategories, entitlements, setIndividual } = this.props

    return (
      <div>

        <div className='names-constainer'>

          {
            totalsRows.map((row) => {
            return (
              <Name staffID={row.staffID}
                    users={users}
                    setIndividual={this.setIndividual}
                />
              )
            })
          }
        </div>

        <div>
          {
            totalsRows.map((row) => {
              return (
                <TotalsRow  row={row}
                            displayCategories={displayCategories}
                            entitlements={entitlements}
                            setIndividual={setIndividual}
                />
              )
            })
          }
        </div>

      </div>
    )
  }

}

export default Summary
