import React, { Component } from 'react'
import axios from 'axios'

const api = 'http://localhost:4000'

class LogInPage extends Component {


  handleSubmit = (event) => {
    event.preventDefault()
    let checkedValue = document.querySelector('#checkbox').checked;
    let login = {
      email: event.target.email.value,
      password: event.target.password.value,
      check: checkedValue
    }
    // axios.post(api + '/login', login).then((response) => {
    //   console.log(response)
    // })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label>Email: <input type="email" name="email" /></label><br />
          <label>Password: <input type="password" name="password" /></label><br />
          <label>Remember me:<input id="checkbox" name="remember" type="checkbox" /></label><br />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LogInPage
