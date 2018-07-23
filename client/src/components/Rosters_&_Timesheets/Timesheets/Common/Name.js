import React, { Component } from 'react'

class Name extends Component {
  constructor(props) {
    super(props)

    this.state = {
      staffName: '',
      clicked: false,
    }

  }

  componentDidMount = () => {
    const { staffID, users } = this.props
    this.setNameState(staffID, users)
  }

  setNameState = (staffID, users) => {
    var staffName = ''
    users.map((user) => {
      if (user._id.toString() === staffID) {
        staffName = user.name
      }
    })
    this.setState({ staffName: staffName })
    // if (this.props.individual === staffID) { add a className to the div and make it a darker grey}
  }

  summaryOrIndividual = (staffID) => {
    const { individual, setIndividual, removeIndividual } = this.props
      this.props.individual === staffID ? removeIndividual() : setIndividual(staffID)
  }

  render() {
    const { staffUser, staffID } = this.props

    if (staffUser) {
      return (
        <div>
          {this.state.staffName}
        </div>
      )
    } else {
      return (
        <div onClick={() => this.summaryOrIndividual(staffID)}>
          {this.state.staffName}
        </div>
      )
    }

  }
}

export default Name
