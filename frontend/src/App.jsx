import React from 'react'
import { Route, Routes } from "react-router-dom";




// Public routes
import PublicLayout from './layouts/publicLayout.jsx'
import Register from './components/public/register.jsx';
import Login from './components/public/login.jsx';


function App() {
  return (
    <>
    <Routes>
    <Route path = "/" element={<PublicLayout/>}/>
    <Route path='Register' element={<Register/>}/>
    <Route path='Login' element={<Login/>}/>
     


    </Routes>
    </>
  )
}

export default App
