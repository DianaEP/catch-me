
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Score from './components/score/Score'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { createContext, useEffect, useState } from 'react'

export const ScoreContext = createContext();
export const UserAuth = createContext();

function App() {
  const [score, setScore] = useState([]);
  const [userAuth, setUserAuth] = useState();

  console.log(userAuth)
  // console.log(setScore)
  
  useEffect(()=>{
    const userToken = localStorage.getItem('accessToken');
    if(userToken){
      setUserAuth(userToken)
    }
  },[])
  
  return (
    <>
      <Navbar/>
      <ScoreContext.Provider value={{score, setScore}}>
        <UserAuth.Provider value={{userAuth, setUserAuth}}>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/score' element={<Score/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </UserAuth.Provider>
      </ScoreContext.Provider>
    </>
  )
}

export default App
