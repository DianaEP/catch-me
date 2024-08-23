import './Game.css'
import { gridItems } from '../../data'
import { useEffect, useRef, useState } from 'react';
import imageSrc from '../../assets/kitty.svg'
import GameOver from '../game-over/GameOver';
import PropTypes from 'prop-types';

const wrongItemMessage =[
    "Wrong ... Try again!",
    "Try harder!",
    "I told you you can't!",
    "I'm too fast...I know!",
    "Man... you're slow!",
    "I'm bored!",
    "I'm so sleepy!"
]

export default function Game({setScore, score}){
    const [randomItem, setRandomItem] = useState(getRandomItem());
    const [message, setMessage] = useState('');
    const [wrongMessage, setWrongMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(30);
    
    const [initialTime, setInitialTime] = useState(30);
    const intervalRef = useRef(null);


    useEffect(()=>{
        startRandomItemInterval();
        
        return ()=> clearInterval(intervalRef.current);
    },[])

    useEffect(()=>{
        if(timer <= 0){
            clearInterval(intervalRef.current);
            setMessage("I knew it! Time is up... Try again!")
            setGameOver(true)
        }
    },[timer])


    function getRandomItem(){
        const randomIndex= Math.floor(Math.random()* gridItems.length);
        const randomItem = gridItems[randomIndex];
        return randomItem;
    }

    function startRandomItemInterval(){
        intervalRef.current= setInterval(()=>{
            setTimer(prevTime => prevTime - 1);
            setInitialTime(30);
            setRandomItem(getRandomItem())
        },1000);
    }


    function handleClick(itemId){
        const randomIndexMessage = Math.floor(Math.random()* wrongItemMessage.length);
        if(itemId === randomItem.id){
            const timeTaken = initialTime - timer;
            setMessage("Good job! You're not that bad after all.");
            setGameOver(true);
            setScore(timeTaken);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        } else {
            setWrongMessage(wrongItemMessage[randomIndexMessage]);
        }
    }


    function resetGame(){
        setRandomItem(getRandomItem());
        setMessage('');
        setWrongMessage('');
        setGameOver(false); 
        setTimer(30);
        setScore(0);
        setInitialTime(30);
        startRandomItemInterval();
    }
    return(
        <>
            <div className="timer-and-message">
                <p>Time: {timer}</p>
                {!gameOver && <p className='wrong-message'>{wrongMessage}</p>}
            </div>
            
            <div className="game-container">
                {gridItems.map((item)=>(
                    <div key={item.id} 
                         className='grid-item'
                         onClick={()=>handleClick(item.id)}>
                        {item.id === randomItem.id && (  
                            <img
                              src={imageSrc}
                              alt="Randomly Moved Image"
                              className='random-img'
                            />
                    )}</div>    
                ))}
                
            </div>
            {gameOver && <GameOver message={message} resetGame={resetGame} score={score}/>}
            
        </>
    )
}

Game.propTypes = {
    score: PropTypes.any,
    setScore: PropTypes.any,
    
  }