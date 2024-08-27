import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { FaPaw } from "react-icons/fa";
import { useContext} from 'react';
import { AuthContext } from '../../App';

export default function Navbar(){
    const {userAuth, setUserAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    // console.log(userAuth.accessToken);

    
    


    function handleLogout(){
        setUserAuth({ 
            accessToken: null, 
            userId: null 
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    return(
        <>
            <nav className="nav-container">
                <div className="logo">
                    <FaPaw />
                </div>
                <ul className="links-container">
                    <div>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/score'>Score</Link></li>
                    </div>
                    
                    <div>
                        <li id='login-link'>
                            {userAuth.accessToken ? (
                                <button className='logout-button' onClick={handleLogout}>Logout</button>
                            ): (
                                <Link to='/login'>Login</Link>
                            )}
                        </li>   
                    </div>
                    
                </ul>
            </nav>
        </>
    )
}