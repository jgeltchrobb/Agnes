import React from 'react'
import SubCategory from './SubCategory'
import staffData from './staffDataTest'

const StaffRow = () => {
  return staffData.map((staff) => {
    return (
      <div className="staffrow" >
        <div className="cell" >
          {staff.staff}
        </div>
        <div className="cell" >
          <h4>Total</h4>
          {staff.total}
        </div>
        <SubCategory {...staff.categories} />
      </div>
    )
  })
}

export default StaffRow
