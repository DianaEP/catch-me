import PropTypes from 'prop-types';
import Modal from '../modal/Modal';
import { useEffect, useState } from 'react';
import Score from '../score/Score';
import AlertModal from '../alert-modal/AlertModal';




export default function GameOver({message,resetGame,score,handleLogout}){
    const latestScore = score.length > 0 ? score[score.length - 1].score : 0;
    const [showScores, setShowScores] = useState(false);
    function handleGameOverClick(){
        resetGame();
    }

    function handleScores() {
        setShowScores(true);
    }

    function closeScores() {
        setShowScores(false);
    }

    
    
    // console.log(score.length > 0);
    
    // console.log(score);
    // console.log('gameOver' + latestScore);
    

    return(
        <>
            <Modal type='gameOver' 
               titleMessage='Game Over!' 
               message={message} 
               latestScore={latestScore} 
               buttonTextOne="Play again" 
               buttonTextTwo="Logout" 
               buttonTextThree="Scores" 
               onButtonClickOne={handleGameOverClick} 
               onButtonClickTwo={handleLogout}
               onButtonClickThree={handleScores}
            />
            {showScores && <AlertModal onClose={closeScores}><Score/></AlertModal>}
        </>
        
    )
}

GameOver.propTypes = {
    message: PropTypes.any,
    resetGame: PropTypes.any,
    score: PropTypes.any,
    handleLogout: PropTypes.any,
    
  }