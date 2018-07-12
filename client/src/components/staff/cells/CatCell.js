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
    let value = parseInt(event.target[0].value)
    let data = {...this.state.data}
    this.props.passTotal({id: data._id, standardID: data.standardID, orgHours: data.hoursWorked, hours: value })
    data.hoursWorked = value
    this.setState({
      clicked: !this.state.clicked,
      data: data
    })
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
          <h4>{this.props.category}</h4>
          <form onSubmit={this.submitHandler} className="cell" >
            <input id="standardInput" placeholder={this.props.hoursWorked} autoFocus="autofocus" />
          </form>
        </div>
      )
    } else {
      return (
        <div className="cell" onClick={this.handleClick} >
          <h4>{this.props.category}</h4>
          {this.state.data.hoursWorked}
        </div>
      )
    }  
  }
}

export default CatCell