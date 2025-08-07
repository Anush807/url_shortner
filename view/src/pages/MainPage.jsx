import React from 'react'
import  Header  from "../components/Header"
import MainSection from '../components/MainSection'

function MainPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header></Header>
      <main>
        <MainSection/>
      </main>
      
    </div>
  )
}
export default MainPage
