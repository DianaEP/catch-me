import './GameOver.css'
import PropTypes from 'prop-types';
import imageSrc from '../../assets/kitty.svg';



export default function GameOver({message,resetGame,score}){

    function handleGameOverClick(){
        resetGame();
    }
    return(
        <div className="message-container">
            <div className="message">
                <h1>Game Over!</h1>
                <div className="content">
                    <img src={imageSrc} alt="game-over-image" />
                    <p>{message}</p>
                </div>
                <p>Score :<span>{score}</span></p>
                <button className='game-over-button' onClick={handleGameOverClick}>Play again</button>
            </div>
                
        </div>
    )
}

GameOver.propTypes = {
    message: PropTypes.any,
    resetGame: PropTypes.any,
    score: PropTypes.any,
    
  }