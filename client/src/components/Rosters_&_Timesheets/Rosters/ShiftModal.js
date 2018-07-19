import React from 'react'
import classNames from 'classnames'
import axios from 'axios'

const api = 'http://localhost:4000/rosters/shift/'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class ShiftModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addHours: false,
      validationError: false,
      category: '',
      start: '',
      finish: ''
    }
  }

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
    this.setState({
      category: this.props.shiftCategory,
      start: this.props.start,
      finish: this.props.finish
    })
  }

  render () {
    console.log(this.state, 'ASJDKASDKKAJSDAKLSDJKAJSDKAJDKASDJKAJDAKLDJ')
    console.log(this.props, 'BBBBBBBBBBBBBBBBBBBBB')
    return (
      <div>
        <form id='shiftForm' onSubmit={ this.props.handleSubmit }>
          <input  name='shiftCategory'
                  placeholder='Shift Category'
                  // value={ this.state.category }
          /> <br />
          <input  name='start'
                  placeholder='start'
                  // value={ this.state.start }
                  type='time'
          />
          <input  name='finish'
                  placeholder='finish'
                  // value={ this.state.finish }
                  type='time'
          /> <br />
          <input type="submit" />
        </form>
        <button onClick={ () => this.addShift() }> add shift </button>

      </div>
    )
  }
}

export default ShiftModal