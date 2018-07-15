import React, { Component } from 'react'

class LogInPage extends Component {


  handleSubmit = (event) => {
    event.preventDefault()
    let checkedValue = document.querySelector('#checkbox').checked;
    let login = {
      email: event.target.email.value,
      password: event.target.password.value,
      check: checkedValue
    }
    console.log(login)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} >
          <label for="email">Email: <input type="email" name="email" /></label><br />
          <label for="password">Password: <input type="password" name="password" /></label><br />
          <label for="remember">Remember me:<input id="checkbox" name="remember" type="checkbox" /></label><br />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default LogInPage
