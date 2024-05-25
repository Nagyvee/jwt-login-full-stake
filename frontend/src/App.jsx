import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/user/login" element={<Login/>}/>
      <Route path="/user/signup" element={<Signup/>}/>
      <Route path='/user/profile' element={<Profile/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
