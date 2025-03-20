import React from 'react'
import SubAdminSidebar from '../../components/SideBar/SubAdminSidebar'

const ContactUS = () => {
  return (
    <div className="flex">
      <SubAdminSidebar/>
      <div className="ml-72  p-6 w-full"> {/* Adjust margin-left based on sidebar width */}
        <h1 className="text-2xl font-bold">Client Contact Details</h1>
      </div>
    </div>
  )
}

export default ContactUS
