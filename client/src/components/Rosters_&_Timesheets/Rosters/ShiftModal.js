import React from 'react'

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

  render () {
    if (!this.props.shiftAdd) {
      if (!this.props.validationError) {
        return (
          <div>
            {this.props.timeError ?
              <p id='validation-error'>! Shift Conflict !</p> :
              <p></p>
            }
            <form id='shiftForm' onSubmit={ this.props.handleSubmit }>
              <input  name='shiftCategory'
                      placeholder={ this.props.shiftCategory }
                      onChange={this.props.shiftCatChange}
              /> <br />
              <input  name='start'
                      placeholder={ this.props.start }
                      type='time'
                      onChange={this.props.startTimeChange}
              />
              <input  name='finish'
                      placeholder={ this.props.finish }
                      type='time'
                      onChange={this.props.finishTimeChange}
              /> <br />
              <label><input type="checkbox" name="pubHol"/>Pub Hol</label><br />
              <label><input type="checkbox" name="wayne"/>Wayne Shift</label><br />
              <input type="submit" />
            </form>
          </div>
        )
      } else {
        return (
          <div>
            {this.props.timeError ?
              <p id='validation-error'>! Shift Conflict !</p> :
              <p id='validation-error'>! Fill out all fields !</p>
            }
            <form id='shiftForm' onSubmit={ this.props.handleSubmit }>
              <input  name='shiftCategory'
                      placeholder={ this.props.shiftCategory }
                      onChange={this.props.shiftCatChange}
              /> <br />
              <input  name='start'
                      placeholder={ this.props.start }
                      type='time'
                      onChange={this.props.startTimeChange}
              />
              <input  name='finish'
                      placeholder={ this.props.finish }
                      type='time'
                      onChange={this.props.finishTimeChange}
              /> <br />
              <label><input type="checkbox" name="pubHol"/>Pub Hol</label><br />
              <label><input type="checkbox" name="wayne"/>Wayne Shift</label><br />
              <input type="submit" />
            </form>
          </div>
        )
      }
    } else {
      if (!this.props.validationError) {
        return (
          <div>
            {this.props.timeError ?
              <p id='validation-error'>! Shift Conflict !</p> :
              <p></p>
            }
            <form id='shiftForm' onSubmit={ this.props.addShiftSubmit }>
              <input  name='shiftCategory'
                      placeholder={ this.props.shiftCategory }
                      onChange={this.props.shiftCatChange}
              /> <br />
              <input  name='start'
                      placeholder={ this.props.start }
                      type='time'
                      onChange={this.props.startTimeChange}
              />
              <input  name='finish'
                      placeholder={ this.props.finish }
                      type='time'
                      onChange={this.props.finishTimeChange}
              /> <br />
              <label><input type="checkbox" name="pubHol"/>Pub Hol</label><br />
              <label><input type="checkbox" name="wayne"/>Wayne Shift</label><br />
              <input type="submit" />
            </form>
          </div>
        )
      } else {
        // validation error
        return (
          <div>
            {this.props.timeError ?
              <p id='validation-error'>! Shift Conflict !</p> :
              <p id='validation-error'>! Fill out all fields !</p>
            }
            <form id='shiftForm' onSubmit={ this.props.addShiftSubmit }>
              <input  name='shiftCategory'
                      placeholder={ this.props.shiftCategory }
                      onChange={this.props.shiftCatChange}
              /> <br />
              <input  name='start'
                      placeholder={ this.props.start }
                      type='time'
                      onChange={this.props.startTimeChange}
              />
              <input  name='finish'
                      placeholder={ this.props.finish }
                      type='time'
                      onChange={this.props.finishTimeChange}
              /> <br />
              <label><input type="checkbox" name="pubHol"/>Pub Hol</label><br />
              <label><input type="checkbox" name="wayne"/>Wayne Shift</label><br />
              <input type="submit" />
            </form>
          </div>
        )
      }
    }
  }
}

export default ShiftModal
