import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import  MainPage  from "./pages/MainPage"

function App() {
  return (
    <div className='min-h-screen bg-[#fdfdfd] overflow-x-hidden'>
        <MainPage></MainPage>
    </div>
  )
}

export default App
