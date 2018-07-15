
} else {
  if (!this.state.individualTotalsRow) { return '' }
  return (
    <div>

      <div className='headerBar'>
        <Header weekDate={week.date}
                nextWeek={nextWeek}
                previousWeek={previousWeek}
                sideBarHeading={sideBarHeading}
        />
      </div>

      <div className='columnHeadings-constainer'>
        {
          this.state.columnHeadings.map((columnHeading) => {
            return (
              <ColumnHeading columnHeading={columnHeading} />
            )
          })
        }
      </div>

      <div className='names-constainer'>
        {
          this.state.staffIdArray.map((id) => {
          return (
            <Name staffID={id}
                  users={users}
                  individual={this.state.individual}
                  setIndividual={this.setIndividual}
                  removeIndividual={this.removeIndividual}
            />
            )
          })
        }
      </div>

      <div className='totalsRow'>
              <TotalsRow  row={this.state.individualTotalsRow}
                          columnHeadings={this.state.columnHeadings}
                          setIndividual={this.setIndividual}
              />
      </div>

      <div>
        <Individual week={week}
                    prevWeek={prevWeek}
                    individual={this.state.individual}
                    shiftBreakLength={shiftBreakLength}
                    individualTotalsRow={this.state.individualTotalsRow}
                    setIndividual={this.setIndividual}
                    removeIndividual={this.removeIndividual}
        />
      </div>

    </div>
  )
}
