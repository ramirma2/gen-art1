import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import WorkArea from './components/WorkArea'


function App() {


  return (
    <div className="grid grid-cols-3 gap-4 App">
      
       <Navbar/>
       <WorkArea />

    </div>
  )
}

export default App
