import React from 'react'

class NameHeaderCell extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
      <div className="sidebar-section">
        <div className="cell">
          <h4>Name</h4>
        </div>
        <div className="cell" >
          <h4>Total</h4>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default NameHeaderCell