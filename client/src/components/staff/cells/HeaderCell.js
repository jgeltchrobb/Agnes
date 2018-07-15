import React from 'react'

class HeaderCell extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <h4>{this.props.category}</h4>
    )
  }
}

export default HeaderCell