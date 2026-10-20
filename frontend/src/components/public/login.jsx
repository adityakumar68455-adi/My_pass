import React, { useState } from 'react'


function Login() {
  const [form , setForm] = useState({
    email :"" ,
    password :""
  })

  const handleChange = (e)=>{
    const {name , value} = e.target;
    setForm((prevData)=>({
      ...prevData , 
      [name] : value
    }))
  }

  console.log(form)
  return (
 <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-center text-gray-800">
    Login
  </h2>

  <input
    type="email" name = "email" value={form.email} onChange={handleChange}
    placeholder="Enter your Email"
    required
    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <input 
    type="password" name = "password" value={form.password} onChange={handleChange}
    placeholder="Enter your Password"
    required
    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  <button
    className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
  >
    Log in
  </button>
</div>
  )
}

export default Login
