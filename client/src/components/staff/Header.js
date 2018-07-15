import React from 'react'
import HeaderCell from './cells/HeaderCell'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      rates: []
    }
    console.log(props.payRates)
  }

  componentDidMount = () => {
    console.log(this.props.payRates)
    let rates = [...this.props.payRates]
    this.setState({rates})
  }

  render() {
    if (this.state.rates) {
      return (
        this.state.rates.map((category) => {
          return (
            <HeaderCell category={category} />
          )
        })
      )
    } else {
      return (
        <div>
          Hello
        </div>
      )
    }
  }
}

export default Header
