import React from 'react'

class NewUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleClick = (event) => {
    
  }

  render () {
    return (
      <button onClick={this.handleClick} >New Staff</button>
    )
  }
}

export default NewUser