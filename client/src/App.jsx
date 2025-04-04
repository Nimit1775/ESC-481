import React from 'react'
// routing  
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Chatbot from './pages/Chatbot'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< LandingPage />} />
          <Route path="/login" element={< Login />} />
          <Route path="/register" element={< Register />} />
          <Route path="/home" element={< Home />} />
          <Route path="/chat" element={< Chatbot />} />
        </Routes>
        
      </BrowserRouter>


    </>
  )
}

export default App
