import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import WorkArea from './components/WorkArea'
import Footer from './components/Footer'


function App() {


  return (
    <div className="flex flex-col gap-3">
      
       <Navbar/>
       <WorkArea />
      <Footer  />
    </div>
  )
}

export default App
