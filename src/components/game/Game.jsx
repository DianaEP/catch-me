import './Game.css'
import { useContext, useEffect, useRef, useState } from 'react';
import imageSrc from '../../assets/kitty.svg'
import GameOver from '../game-over/GameOver';
import PropTypes from 'prop-types';
import { AuthContext, ScoreContext} from '../../App';
import { v4 as uuidv4 } from 'uuid';
import { deleteUser, getGridItem } from '../../fetch';
import { postScore } from '../../fetch';
import { getUserName } from '../../fetch';
import { useNavigate } from 'react-router-dom';
import Modal from '../modal/Modal';

const wrongItemMessage =[
    "Wrong ... Try again!",
    "Try harder!",
    "I told you you can't!",
    "I'm too fast...I know!",
    "Man... you're slow!",
    "I'm bored!",
    "I'm so sleepy!"
]

const INITIAL_TIMER = 30;

export default function Game(){

    const navigate = useNavigate();
    const {userAuth, setUserAuth} = useContext(AuthContext);
    const { setScore, score } = useContext(ScoreContext);
    const [gridItems, setGridItems] = useState([]);
    const [randomItem, setRandomItem] = useState(null);
    const [message, setMessage] = useState('');
    const [wrongMessage, setWrongMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(INITIAL_TIMER);
    const [initialTime, setInitialTime] = useState(INITIAL_TIMER);
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] =useState(true);

    const intervalRef = useRef(null);
    const uniqueId = uuidv4();

    console.log(userAuth);
    


    useEffect(()=>{
        if(userAuth.accessToken && userAuth.userId){
            getGridItem(setGridItems, userAuth.accessToken, navigate);
            getUserName(userAuth.userId,userAuth.accessToken, setUserName)
        }
    },[userAuth.accessToken, userAuth.userId,navigate])

    
    
 
    useEffect(() => {
        if (!showModal && gridItems.length > 0 && !gameOver) {
            startRandomItemInterval();
            setRandomItem(getRandomItem());
        }
        return () => clearInterval(intervalRef.current);
    }, [gridItems, gameOver, showModal]);

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
            console.log(timeTaken);
            setMessage("Good job! You're not that bad after all.");
            setGameOver(true);
            setScore((prevScore) => [...prevScore, {id:uniqueId, score: timeTaken, userName, userId: userAuth.userId}]);

    //         const newScore = { id: uniqueId, score: timeTaken, userName };
    // setScore(prevScore => {
    //   console.log('Previous score:', prevScore);
    //   const updatedScore = [...prevScore, newScore];
    //   console.log('Updated score:', updatedScore);
    //   return updatedScore;
    // });
            clearInterval(intervalRef.current);
            await postScore({ id: uniqueId, score: timeTaken, userName,userId: userAuth.userId }, userAuth.accessToken);
        } else {
            setWrongMessage(wrongItemMessage[randomIndexMessage]);
        }
    }


    function resetGame(){
        setRandomItem(getRandomItem());
        setMessage('');
        setWrongMessage('');
        setGameOver(false); 
        setTimer(INITIAL_TIMER);
        setInitialTime(INITIAL_TIMER);
        startRandomItemInterval();
    }

    function handleLogout(){
        setUserAuth({ 
            accessToken: null, 
            userId: null 
        });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    async function handleDeleteAccount(e){
        e.preventDefault();
        if (!userAuth || !userAuth.accessToken || !userAuth.userId) {
            console.error('User is not authenticated');
            return;
        }
        try{
            const userConfirmedAction = await confirm('Are you sure you want to delete your account?') // confirmation box 
            if(userConfirmedAction){
              deleteUser(userAuth,navigate);
              localStorage.removeItem('accessToken');
              localStorage.removeItem('userAuth');
              setUserAuth({ accessToken: null, userId: null });
              navigate('/register');
            } 
            }catch(error) {
              if (error !== false) {
                console.error('Error deleting user account:', error);
              } else {
                console.log('Account deletion canceled by user.');
              }
            }
    }

    function notShowModal(){
        setShowModal(false);
    }
    return(
        <>
            {showModal && (
                <Modal 
                    type="welcome"
                    titleMessage={`Welcome, ${userName} !`}
                    buttonTextOne="Play" 
                    buttonTextTwo="Logout" 
                    buttonTextThree="Delete Account" 
                    onButtonClickOne={notShowModal} 
                    onButtonClickTwo={handleLogout}
                    onButtonClickThree={handleDeleteAccount}
                />
            )}

            {!showModal && (
                <>
                    <div className="game-wrapper">
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
                    </div>
                    {gameOver && <GameOver message={message} resetGame={resetGame} handleLogout={handleLogout}/>}
                </>
            )}
            
            
        </>
    )
}

Game.propTypes = {
    score: PropTypes.any,
    setScore: PropTypes.any,
    
  }