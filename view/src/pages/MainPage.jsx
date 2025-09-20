import React from 'react'
import  Header  from "../components/Header"
import MainSection from '../components/MainSection'

function MainPage() {
  return (
    <div className='flex flex-col h-screen overflow-hidden' >
      <Header></Header>
      <main>
        <MainSection/>
      </main>
      
    </div>
  )
}
export default MainPage
