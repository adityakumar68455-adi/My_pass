import React, { useState } from 'react'
import api from '../api/axios';
import { useNavigation } from 'react-router-dom';


function register() {
  const [form , setForm] = useState({
    email : '', 
    rollno : '',
    password : '' ,
    role :'student'
  })
  const navigate = useNavigation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {email ,rollno, password , role} = form;
       const payLoad = {email ,rollno, password , role}
    const response = await api.post('/auth/register' , payLoad)
    console.log("Register successfully" , response.data)
    if(response.data.success == true){
      navigate('/login')
    }
    } catch (error) {
      console.log("Error during register" , error.response?.data?.message ||
        error.response?.data ||
        error.message )
    } 
   
  }

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setForm((prevData)=>({
      ...prevData ,
      [name] : value
    }))

  }
    
  return (
    
<div className="min-h-screen flex items-center justify-center bg-gray-100">
  <form onSubmit={handleSubmit}>
  <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
    <h2 className="text-2xl font-bold text-center mb-6">
      Create Account
    </h2>

    <div className="space-y-4">
      <input
        name="email"
        value={form.email}
        type="email"
        placeholder="Enter your Email"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="rollno"
        value={form.rollno}
        type="text"
        placeholder="Enter your Roll no"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        name="password"
        value={form.password}
        required
        type="password"
        placeholder="Enter your Password"
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        name="role" value = {form.role} onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="student">Student</option>
        <option value="hod">HOD</option>
      </select>

      <button
        type="submit" 
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
      >
        Create
      </button>
    </div>
  </div>
  </form>
</div>

  )
}

export default register
