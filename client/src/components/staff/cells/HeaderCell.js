import React from 'react'

class HeaderCell extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="cell">
        <h4>{this.props.category}</h4>
      </div>
    )
  }
}

export default HeaderCell