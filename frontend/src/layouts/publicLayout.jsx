import React from 'react'
import {Link , Outlet } from "react-router-dom"

function PublicLayout() {
  
  return (
    
<div className="min-h-screen flex flex-col bg-gray-50">
  {/* Navbar */}
  <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white border-b border-gray-200 shadow-sm">
    
    {/* Logo */}
    <Link
      to="/"
      className="text-2xl font-bold text-indigo-600 tracking-tight"
    >
      MyPass
    </Link>

    {/* Navigation Links */}
    <div className="flex items-center gap-3 sm:gap-5">
      <Link
        to="/register"
        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
      >
        Sign Up
      </Link>

      <Link
        to="/login"
        className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Login
      </Link>
    </div>
  </nav>

  {/* Main Content */}
  <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
    <Outlet />
  </main>

  {/* Footer */}
  <footer className="border-t border-gray-200 bg-white py-5 text-center">
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} MyPass. All rights reserved.
    </p>
  </footer>
</div>

  )
}

export default PublicLayout
