import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import Signup from './Signup'


function App() {
  return (
    <>
    <BrowserRouter>
    <h1>Hello World</h1>
    <Routes>
      <Route path="/user/login" element={<Login/>}/>
      <Route path="/user/login" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
