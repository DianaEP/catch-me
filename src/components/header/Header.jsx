
import './Header.css'
import kitty from '../../assets/kitty.svg'

export default function Header(){
    return(
        <>
            <div className="header-container">
                <h1>
                    Catch me 
                </h1>
                <p><img src={kitty} alt="kitty" className='mascot-image'/>...if you can</p>
                
                {/* <p className="mascot-message">Don&apos;t forget your password, hero!</p> */}
                
            </div>
        </>
    )
}