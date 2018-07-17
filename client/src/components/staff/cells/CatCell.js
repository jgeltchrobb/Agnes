import React from 'react'
import axios from 'axios'

const api = 'http://localhost:4000'

class CatCell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props,
      clicked: false,
      cellValue: '',
    }
  }

  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    })
  }

  submitHandler = (event) => {
    event.preventDefault()
    let prevVal = this.state.value
    let data = {...this.state.data}
    let value = event.target[0].value
    console.log(this.props)
    if (!value.match(/[a-z]/i)) {
      this.props.passTotal({id: data._id, standardID: data.standardID, orgHours: data.hoursWorked, hours: value })
      data.hoursWorked = value
      this.setState({
        clicked: !this.state.clicked,
        data: data,
        value: value
      })
    } else {
      data.hoursWorked = prevVal
      this.setState({
        clicked: !this.state.clicked,
        data: data,
        value: prevVal
      })
    }
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.data.hoursWorked !== this.state.data.hoursWorked) {
      axios.put(api + `/standardHours/${this.props.standardID}`, this.state.data).then((response) => {
        console.log(response)
      })
    }
  }
  
  render() {
    if (this.state.clicked) {
      return (
        <div className="cell" onClick={this.handleClick} >
          {/* <h4>{this.props.category}</h4> */}
          <form onSubmit={this.submitHandler} >
            <input id="standardInput" placeholder={this.props.hoursWorked} autoFocus="autofocus" />
          </form>
        </div>
      )
    } else {
      return (
        <div className="cell" onClick={this.handleClick} >
          {/* <h4>{this.props.category}</h4> */}
          <p id="standardInput" >{this.state.data.hoursWorked}</p>
        </div>
      )
    }  
  }
}

export default CatCell