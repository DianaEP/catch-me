
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Score from './components/score/Score'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { createContext, useState } from 'react'

export const ScoreContext = createContext();

function App() {
  const [score, setScore] = useState(0);
  
  return (
    <>
      <Navbar/>
      <ScoreContext.Provider value={{score, setScore}}>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/score' element={<Score/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
      </Routes>
      </ScoreContext.Provider>
    </>
  )
}

export default App
