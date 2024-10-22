import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-12 w-full bg-[#1F2937] flex items-center justify-center gap-5'>
        <NavLink to="/" className={({isActive}) => 
            isActive ? "text-blue-500 font-semibold text-lg": "text-white font-medium text-lg"
        }>
        Home
        </NavLink>
        <NavLink to="/pastes" className={({ isActive }) => 
            isActive ? "text-blue-500 font-semibold text-lg": "text-white font-medium text-lg"
        }>
        Pastes
        </NavLink>
    </div>
  )
}

export default Navbar