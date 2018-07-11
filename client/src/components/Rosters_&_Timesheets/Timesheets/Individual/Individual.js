import React, { Component } from 'react'
import Name from '../Common/Name'
import TotalsRow from '../Common/TotalsRow'

class Individual extends Component {
  constructor(props) {
    super(props)


  }

  nameToTop = () => {
    {/* Take name/id array and sort clicked name to front */}
  }

  render() {
    const { individual, totalsRows, users, displayCategories, entitlements, setIndividual, removeIndividual } = this.props

    return (
      <div>

        <div className='names-constainer'>

          {
            totalsRows.map((row) => {
            return (
              <Name staffID={row.staffID}
                    users={users}
                    setIndividual={setIndividual}
                    removeIndividual={removeIndividual}
                />
              )
            })
          }
        </div>

        <div>
          {
            totalsRows.map((row) => {
              return (
                <TotalsRow  individual={individual}
                            row={row}
                            displayCategories={displayCategories}
                            entitlements={entitlements}
                            removeIndividual={removeIndividual}
                />
              )
            })
          }
        </div>

      </div>
    )
  }
}

export default Individual
