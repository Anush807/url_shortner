import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from "./pages/MainPage"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateLinkCard from './components/CreateLinkCard' 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<div className='min-h-screen bg-[#fdfdfd] overflow-x-hidden'>
                <MainPage></MainPage>
              </div>}></Route>
              
        </Routes>

      </BrowserRouter>


    </div>

  )
}

export default App
