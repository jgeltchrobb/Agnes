import React, { Component } from 'react'

class Name extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

  }

  componentDidMount = () => {

    var name = ''
    this.props.users.map((user) => {
      if (user.staffID.toString() === this.props.staffID) {
        name = user.name
      }
    })
    this.setState({
      name: name
    })
    // if (this.props.individual) { add a className to the div and make it a darker grey}
  }

  render() {
    const { users, staffID, setIndividual } = this.props

    return (
      <div onClick={() => setIndividual(staffID)}>
        {/* {
          if (individual) {
          if (individual == staffID) {
          trigger callback to put this name at the start of the array
        } else {
        change className to grey out
        }
        } */}

        {/* Need to query the user model for name */}

        {this.state.name}

      </div>

    )
  }
}

export default Name
