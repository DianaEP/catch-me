import { Link } from 'react-router-dom';
import './Navbar.css'
import { FaPaw } from "react-icons/fa";

export default function Navbar(){
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
                        <li id='login-link'><Link to='/login'>Login</Link></li>
                    </div>
                    
                </ul>
            </nav>
        </>
    )
}