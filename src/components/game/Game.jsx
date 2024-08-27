import './Game.css'
import { useContext, useEffect, useRef, useState } from 'react';
import imageSrc from '../../assets/kitty.svg'
import GameOver from '../game-over/GameOver';
import PropTypes from 'prop-types';
import { AuthContext, ScoreContext} from '../../App';
import { v4 as uuidv4 } from 'uuid';

const wrongItemMessage =[
    "Wrong ... Try again!",
    "Try harder!",
    "I told you you can't!",
    "I'm too fast...I know!",
    "Man... you're slow!",
    "I'm bored!",
    "I'm so sleepy!"
]

async function getGridItem(setGridItems,token){
    try{
        const response = await fetch('http://localhost:3000/gridItems',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        const data = await response.json();
        if(response.ok){

            setGridItems(data);
        }

    }catch(error){
        console.error('Error fetching grid items:', error);
    }
}

async function postScore(score){
    try{
        const response = await fetch('http://localhost:3000/score', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            //   Authorization: `Bearer ${userAuth.token}`,
            },
            body: JSON.stringify(score),
          });
        const data = await response.json();
        console.log(data);
        

    }catch(error){
        console.error('Error fetching grid items:', error);
    }
}

export default function Game(){
    const {userAuth} = useContext(AuthContext);

    const { setScore, score } = useContext(ScoreContext);
    const [gridItems, setGridItems] = useState([]);
    const [randomItem, setRandomItem] = useState(null);
    const [message, setMessage] = useState('');
    const [wrongMessage, setWrongMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(30);
    
    const [initialTime, setInitialTime] = useState(30);

    const intervalRef = useRef(null);
    const uniqueId = uuidv4();

    // console.log('game'+userAuth);


    useEffect(()=>{
        const token = userAuth.accessToken
        if(token){
            getGridItem(setGridItems, token)
        }
    },[userAuth.accessToken])
 
    useEffect(() => {
        if (gridItems.length > 0 && !gameOver) {
            startRandomItemInterval();
            setRandomItem(getRandomItem());
        }

        return () => clearInterval(intervalRef.current);
    }, [gridItems, gameOver]);

    useEffect(()=>{
        if(timer <= 0){
            clearInterval(intervalRef.current);
            setMessage("I knew it! Time is up... Try again!")
            setGameOver(true);
            setScore((prevScore) => [...prevScore, { id: uniqueId, score: 0 }]);
        }
    },[timer])



    function getRandomItem(){
        if (gridItems.length === 0) return null
        const randomIndex= Math.floor(Math.random()* gridItems.length);
        return gridItems[randomIndex];
    }

   
    function startRandomItemInterval(){
        intervalRef.current= setInterval(()=>{
            setTimer(prevTime => prevTime - 1);
            setRandomItem(getRandomItem())
        },1000);
    }


    async function handleClick(itemId){
        if (!randomItem) return; 
        const randomIndexMessage = Math.floor(Math.random()* wrongItemMessage.length);
        if(itemId === randomItem.id){
            const timeTaken = initialTime - timer;
            
            setMessage("Good job! You're not that bad after all.");
            setGameOver(true);
            setScore((prevScore) => [...prevScore, {id:uniqueId, score: timeTaken}]);
            clearInterval(intervalRef.current);
            await postScore({ id: uniqueId, score: timeTaken });
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
                        {randomItem && item.id === randomItem.id && (
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