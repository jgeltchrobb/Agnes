import React from 'react'
import CatCell from './cells/CatCell'
import RostCells from './cells/RostCells';

class SubCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalHours: [],
      data: props,
      revealed: this.props.revealed
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

  render() {
    return (
      this.props.categories.map((category) => {
        if (this.props.revealed == this.props.name) {
          return (
            <div className="cat-cell" >
              <CatCell {...category} standardID={this.props._id} passTotal={this.props.passTotal} />
              <RostCells {...this.props.rostered} {...category} />
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

