import React, { Component } from 'react'

class Value extends Component {
  state = {
    date: '',
    value: '',
    editing: false,
  }

  componentDidMount = () => {
    const { date, value } = this.props
    this.setState({
      date: date,
      value: value,
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { date, value } = this.props
    if (this.state.value !== prevState.value) {
      this.setState({
        date: date,
        value: value,
      })
    }
  }

  formatTime_DateObjtoDisplayString = (time) => {
    if (time) {
      let hr = new Date(time).getHours()
        if (hr < 10) {
          hr = ('0' + hr)
        }
      let min = new Date(time).getMinutes()
        if (min < 10) {
          min = ('0' + min)
        }
      return ( `${hr} : ${min}` )
    } else { return '' }
  }

  update = (e) => {
    this.setState({ value: e.target.value })
  }

  post = (e) => {

  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }

  render() {
    const { value } = this.state

    if (typeof(value) === 'object') {
      if (!this.state.editing) {
        return (
          <div className='value-constainer' onClick={ () => this.toggleEditing() }>
          { this.formatTime_DateObjtoDisplayString(value) }
          </div>
        )
      } else {
        return(
          <div className='value-constainer'>
            <form onSubmit={ this.post }>
              <input  placeholder='value'
                      value={ value }
                      onChange={ this.update }
                      type='time'
              />
              <input type='Submit' />
            </form>
          </div>
        )
      }
    } else {
      if (!this.state.editing) {
        return (
          <div className='value-constainer' onClick={ () => this.toggleEditing() }>
            { value }
          </div>
        )
      } else {
        return(
          <div className='value-constainer'>
            <form onSubmit={ this.post }>
              <input  placeholder='value'
                      value={ value }
                      onChange={ this.update }
                      type='number'
              />
              <input type='Submit' />
            </form>
          </div>
        )
      }
    }


  }
}

export default Value
