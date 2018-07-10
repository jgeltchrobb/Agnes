import React from 'react'
import CatCell from './cells/CatCell'
import RostCell from './cells/RostCell';

class SubCategory extends React.Component {
  constructor(props) {
    console.log(props, 'propsoprops')
    super(props)
    this.state = {
      categories: [],
      data: props,
    }
  }

  componentDidMount = () => {
    let categories = []
    for (const key of Object.keys(this.state.data.categories)) {
      categories.push(this.state.data.categories[key])
    }
    this.setState({categories})
  }

  render() {
    if (this.props.revealed === this.state.data.staff) {
      return (
        this.state.categories.map((category) => {
          return (
            <div>
              <CatCell handleClick={this.toggleHandler} {...category} />
              <RostCell {...category} />
            </div>  
          )
        })
      )
    } else {
      return (
        this.state.categories.map((category) => {
          return (
            <div className="cat-cell" >
              <CatCell onClick={this.toggleHandler} {...category} />
            </div>  
          )
        })
      )
    }
  }  
}
export default SubCategory

