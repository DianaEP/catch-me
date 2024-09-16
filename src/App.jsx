
import { Navigate, Route, Routes} from 'react-router-dom'
import Home from './components/home/Home'
import Login from './components/authentication/Login'
import Register from './components/authentication/Register'
import { createContext, useEffect, useState } from 'react'

export const ScoreContext = createContext();
export const AuthContext = createContext();

function App() {
  const [score, setScore] = useState([]);
  const [userAuth, setUserAuth] = useState({
    accessToken : localStorage.getItem('accessToken') || null,
    userId : localStorage.getItem('userId') || null
  });


  useEffect(()=>{
    const userToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    if(userToken && userId){
      setUserAuth({
        accessToken : userToken,
        userId : userId
      })
    }else{
      setUserAuth({
        accessToken : null,
        userId : null
      })
    }
  },[])


  // private routes
  const isAuthenticated = userAuth.accessToken && userAuth.userId;

  return (
    <>
      
      <ScoreContext.Provider value={{score, setScore}}>
        <AuthContext.Provider value={{userAuth, setUserAuth}}>
          <Routes>
            <Route path='/' element={isAuthenticated ? <Home/> : <Navigate to='/login'/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </AuthContext.Provider>
      </ScoreContext.Provider>
    </>
  )
}

export default App
