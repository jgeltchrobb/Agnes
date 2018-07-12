import React from 'react'
import RosterTotalCell from './cells/RosterTotalCell';

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      staffData: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.staffData !== prevProps.staffData) {
      this.setState({staffData: this.props.staffData})
            
    }
  }
  
  componentWillMount() {
    this.props.fetchStandard()
  }

  componentWillReceiveProps({staffData}) {
    this.setState({staffData})
  }

  render() {
    return (
      <div className="sidebar" >
        {this.state.staffData.map((staff) => {
          if (this.props.revealed === staff.name) {
            return (
              <div className="sidebar-section" >
                <div className="name-plates" >
                  <div className="cell" name={staff.name} onClick={this.props.handleClick} ><h4>{staff.name}</h4></div>
                  <div className="cell" >
                    <h4>Rostered</h4>
                  </div>
                </div>
                <div className="roster-plates" >
                  <div className="cell" >
                    <h4>Total</h4>
                    {localStorage.getItem(`${staff.name}`)}
                  </div>
                  <div className="cell" >
                    <RosterTotalCell />
                    {/*rostered={staff.rosteredTotal}*/} 
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="sidebar-section" >
                <div className="cell" name={staff.name} onClick={this.props.handleClick} ><h4>{staff.name}</h4></div>
                <div className="cell" >
                  <h4>Total</h4>
                  {localStorage.getItem(`${staff.name}`)}
                </div>
              </div>
            )
          }
        })}
      </div>
    )



  }
}

export default SideBar