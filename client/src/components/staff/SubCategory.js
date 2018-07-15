import React from 'react'
import CatCell from './cells/CatCell'
import RostCells from './cells/RostCells';
import HeaderCell from './cells/HeaderCell';

class SubCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalHours: [],
      data: props,
      revealed: this.props.revealed,
      categories: []
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.totals !== this.props.totals) {
      let categories = [...this.props.categories]
      for (let obj of categories) {
        for (let total of this.props.totals) {
          if (total.staffID === this.props.staffID) {
            for (let key of Object.keys(total)) {
              if (obj.category === this.categoryChecker(key)) {
                obj.rostered = total[key]
                break
              } else {
                obj.rostered = 0
              }
            }
          }
        }  
      }
      this.setState({categories: categories, totals: this.props.totals})
    }
  }

  componentWillMount = () => {
    let totalHours = 0
    for (let obj of this.props.categories) {
      totalHours += obj.hoursWorked
    }
    localStorage.setItem(`${this.props.name}`, totalHours)
    this.setState({totalHours})
  }

  categoryChecker = (key) => {
    switch (key) {
      case 'Ordinary':
        return 'Ordinary'
      case 'Saturday':
        return 'Sat'
      case 'Sunday':
        return 'Sun'
      case 'Night':
        return 'Night'
      case 'Public Holiday':
        return 'PublicHoliday'
      case 'Wayne Ordinary':
        return 'WayneOrdinary'
      case 'Wayne Saturday':
        return 'WayneSat'
      case 'Wayne Sunday':
        return 'WayneSun'
      case 'Wayne Night':
        return 'WayneNight'
      case 'Wayne Public Holiday':
        return 'WaynePublicHoliday'
      default:
        return key
    }
  }

  render() {
    return (
      this.props.categories.map((category) => {
        if (this.props.revealed == this.props.name) {
          return (
            <div className="row" >
              <CatCell {...category} standardID={this.props._id} passTotal={this.props.passTotal} />
              <RostCells {...category} />
            </div>  
          )
        } else {
          return (
            <div>
              <CatCell {...category} standardID={this.props._id} passTotal={this.props.passTotal} />
            </div>
          ) 
        }
      })
    )
  }
}  
export default SubCategory

