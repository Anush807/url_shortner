import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from "./pages/MainPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import CreateLinkCard from './components/CreateLinkCard'
// import Dashboard from './pages/Dashboard'
// import SignInPage from './pages/SignIn'
// import SignUpPage from './pages/SignUp'
// import ProtectedRoute from "./Protected"
// import { AuthProvider } from './context/AuthContext'
// import RequestPasswordChangePage from './components/RequestResetPassword'
// import ResetPasswordPage from './pages/ResetPasswordPage'

function App() {
  return (
      <div>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route> */}
            <Route path='/' element={<div className='min-h-screen bg-[#fdfdfd] overflow-x-hidden'>
              <MainPage></MainPage>
            </div>}></Route>
            {/* <Route
              path="/signin"
              element={
                <SignInPage></SignInPage>
              }
            /> */}
            {/* <Route
              path="/dashboard"
              element={

                <Dashboard></Dashboard>


              }
            /> */}
            {/* <Route path="/request-password-change" element={<RequestPasswordChangePage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} /> */}

          </Routes>
        </BrowserRouter>
      </div>
    

  )
}
export default App
