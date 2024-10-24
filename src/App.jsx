import React from 'react'
import './App.css'
import Home from './home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import Latestbook from './latestbooks/Latestbook'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'
import Audiobook from './audiobooks/Audiobook'

function App() {
  const [authUser , setAuthUser] = useAuth()
  console.log(authUser); 

  return (
    <>
      <div className='dark:bg-slate-900 dark:text-white'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/latestbooks' element={authUser?<Latestbook/>:<Navigate to='/signup'/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/audiobooks' element={<Audiobook/>}/>
      </Routes>
      <Toaster />
      </div>
    </>
  )
}

export default App
