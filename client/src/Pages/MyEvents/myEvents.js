import React from 'react'
import Sidebar from '../../components/Sidebar'


function myEvents () {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
            Your events Right here
        </div>

    </div>
  )
}

export default myEvents