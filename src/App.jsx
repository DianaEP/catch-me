
import { Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Score from './components/score/Score'
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

  const location = useLocation(); 
  const currentPath = location.pathname.toLowerCase();
  const navigate = useNavigate();

  
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
      navigate('/login');  
    }
  },[navigate])

  
  

  // console.log('Current Path:', location.pathname);

  // private routes
  const isAuthenticated = userAuth.accessToken && userAuth.userId;
  const hideNavbar = currentPath !== '/login' && currentPath !== '/register';

  return (
    <>
      
      <ScoreContext.Provider value={{score, setScore}}>
        <AuthContext.Provider value={{userAuth, setUserAuth}}>
          {/* {hideNavbar && <Navbar />} */}
          <Routes>
            <Route path='/' element={isAuthenticated ? <Home/> : <Navigate to='/login'/>}></Route>
            {/* <Route path='/score' element={isAuthenticated ? <Score/> : <Navigate to='/login'/>}></Route> */}
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </AuthContext.Provider>
      </ScoreContext.Provider>
    </>
  )
}

export default App
