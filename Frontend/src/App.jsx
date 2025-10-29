import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Auth from './components/Auth'

function App() {

  return (
    <>
      <Navbar />
      <div className='min-h-[80vh]'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
