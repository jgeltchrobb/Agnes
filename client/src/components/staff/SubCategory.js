import React from 'react'
import CatCell from './cells/CatCell'
import RostCell from './cells/RostCell';

class SubCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      data: props,
      revealed: this.props.revealed
    }
  }

  componentWillMount = () => {
    let categories = this.props.categories
    let cat = []
    for (let key in categories) {
      if (categories.hasOwnProperty(key)) {
          cat.push(categories[key])
      }
    }
    this.setState({
      categories: cat
    })
  }

  render() {
    return (
      this.state.categories.map((category) => {
        if (this.props.revealed == this.state.data.staff) {
          return (
            <div className="cat-cell" >
              <CatCell {...category} />
              <RostCell {...category} />
            </div>  
          )
        } else {
          return (
            <div>
              <CatCell {...category} />
            </div>
          )
        }
      })
    )
  }
}  
export default SubCategory

