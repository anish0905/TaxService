import React, { useEffect, useState } from 'react'
import SubAdminSidebar from '../../components/SideBar/SubAdminSidebar'
import axios from 'axios'

const ContactUS = () => {
  const URI = import.meta.env.VITE_API_URL
  const [contacts , setContact]=useState([])
  console.log(contacts);
  const fetchContact = async(req,res)=>{
    try{
      const response = await axios.get(`${URI}/api/contact`)
      
      if(response.status === 200){
        setContact(response.data)
      }
      

    }
    catch(err){
      console.error(err)
      res.status(500).json({ message: 'Server Error' })
      return 0
    }

  }
  useEffect(()=>{
    fetchContact()
  },[])
  return (
    <div className="flex">
      <SubAdminSidebar/>
      <div className="ml-72  p-6 w-full"> {/* Adjust margin-left based on sidebar width */}
        <h1 className="text-2xl font-bold">Client Contact Details</h1>
        <table className="min-w-full border border-gray-300">
  <thead className="bg-gray-100">
    <tr>
      <th className="border px-4 py-2">#</th>
      <th className="border px-4 py-2">Name</th>
      <th className="border px-4 py-2">Email</th>
      <th className="border px-4 py-2">Query</th>
      <th className="border px-4 py-2">Created At</th>
    </tr>
  </thead>
  <tbody>
    {contacts.map((contact, index) => (
      <tr key={index} className="border">
        <td className="border px-4 py-2">{index + 1}</td>
        <td className="border px-4 py-2">{contact.name}</td>
        <td className="border px-4 py-2">{contact.email}</td>
        <td className="border px-4 py-2">{contact.query}</td>
        <td className="border px-4 py-2">{new Date(contact.createdAt).toLocaleString()}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  )
}

export default ContactUS
