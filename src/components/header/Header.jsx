
import './Header.css'
import kitty from '../../assets/kitty.svg'
import { useLocation } from 'react-router-dom'

export default function Header(){
    const location = useLocation(); 
    const currentPath = location.pathname.toLowerCase();
    const showParagraph = currentPath == '/login' || currentPath == '/register';
    return(
        <>
            <div className="header-container">
                <h1>
                    Catch me 
                </h1>
                {showParagraph && <p><img src={kitty} alt="kitty" className='mascot-image'/>...if you can</p>}
                
                
                {/* <p className="mascot-message">Don&apos;t forget your password, hero!</p> */}
                
            </div>
        </>
    )
}