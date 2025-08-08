import React from 'react'
import ButtonComponent from './ButtonComponent'

function Header() {
  return (
    <div>
   <header className="w-full py-4 px-6 bg-white">
      <div className=" relative flex items-center justify-center">
        <div className='flex items-center gap-8'>
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 mr-10" style={{fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'}}>
          link.li
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm text-gray-600">
          <button className="hover:text-black transition-colors cursor-pointer">Dashboard</button>
          <button className="hover:text-black transition-colors cursor-pointer">Links</button>
          <button className="hover:text-black transition-colors cursor-pointer">Account</button>
        </div>
      </div>
      <div className='absolute right-0'>
          <ButtonComponent></ButtonComponent>
      </div>
      </div>
    </header>
  
    </div>
  )
}
export default  Header  
