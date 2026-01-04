import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import Signin from './components/Signin'
import Login from './components/Login'
import WelcomePage from './components/WelcomePage'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<WelcomePage />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/pass-manager"
            element={<>
              <Navbar />
              <div className='min-h-[80vh]'>
                <Manager />
              </div>
              <Footer />
            </>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
