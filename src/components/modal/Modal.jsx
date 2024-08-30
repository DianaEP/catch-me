import imageSrc from '../../assets/kitty.svg'
import './Modal.css';
import PropTypes from 'prop-types';


export default function Modal({
    type, 
    titleMessage, 
    message,
    latestScore, 
    onButtonClickOne, 
    onButtonClickTwo, 
    onButtonClickThree, 
    buttonTextOne, 
    buttonTextTwo, 
    buttonTextThree}){

    const modalClass = type === 'gameOver' ? 'modal-column' : 'modal-row';
    const modalClassButton = type === 'gameOver' ? 'button-row' : 'button-column';

    return(
        <div className="message-container">
            <div className="message">
                <h2>{titleMessage}</h2>
                <div className={modalClass}>
                    <div className="content">
                        <img src={imageSrc} alt="modal-image" />
                        {type === 'gameOver' && (
                            <p className='content-message'>{message}</p>
                        )}
                    </div>
                    {type === 'gameOver' && (
                            <p className='score-message'>Score: <span>{latestScore}s</span></p>
                    )}
                    <div className={modalClassButton}>
                        <button className='modal-button' onClick={onButtonClickOne}>{buttonTextOne}</button>
                        <button className='modal-button' onClick={onButtonClickTwo}>{buttonTextTwo}</button>
                        <button className='modal-button' onClick={onButtonClickThree}>{buttonTextThree}</button>      
                    

                    </div>

                </div>
            </div>
                
        </div>
    )
}

Modal.propTypes = {
    type: PropTypes.any,
    titleMessage: PropTypes.any,
    message: PropTypes.any,
    setScore: PropTypes.any,
    latestScore: PropTypes.any,
    onButtonClickOne: PropTypes.any,
    onButtonClickTwo: PropTypes.any,
    onButtonClickThree: PropTypes.any,
    buttonTextOne: PropTypes.any,
    buttonTextTwo: PropTypes.any,
    buttonTextThree: PropTypes.any,  
  }
