import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from "./pages/MainPage"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateLinkCard from './components/CreateLinkCard'
import Dashboard from './pages/Dashboard'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>
          <Route path='/' element={<div className='min-h-screen bg-[#fdfdfd] overflow-x-hidden'>
            <MainPage></MainPage>
          </div>}></Route>
          <Route
            path="/signin"
            element={
            <SignInPage></SignInPage>
            }
          />
        
          <Route
            path="/dashboard"
            element={
                <Dashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
