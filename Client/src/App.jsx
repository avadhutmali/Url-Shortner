import React from 'react'
import UrlGenerate from './components/UrlGenerate'
import LoginPage from './components/Login'
import { Route, Routes } from 'react-router-dom'
import SignupPage from './components/Signup'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div>
      {/* <UrlGenerate/> */}
      {/* <LoginPage/> */}

      <Routes>

        <Route path='/' element={<UrlGenerate/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App