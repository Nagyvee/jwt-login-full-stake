import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import Signup from './Signup'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/user/login" element={<Login/>}/>
      <Route path="/user/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
