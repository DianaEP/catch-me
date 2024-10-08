import './Game.css'
import { useCallback, useContext, useEffect, useState } from 'react';
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
import { useConfirm } from '../alert-confirm-modal/ConfirmFunction';
import { useGameIntervals } from '../../customHooks';
import { INITIAL_TIMER, wrongItemMessage } from '../../utils';



export default function Game(){
    const navigate = useNavigate();
    const {userAuth, setUserAuth} = useContext(AuthContext);
    const { setScore} = useContext(ScoreContext);

    const [gridItems, setGridItems] = useState([]);
    const [randomItem, setRandomItem] = useState(null);
    const [message, setMessage] = useState('');
    const [wrongMessage, setWrongMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [timer, setTimer] = useState(INITIAL_TIMER);
    const [initialTime, setInitialTime] = useState(INITIAL_TIMER);
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] =useState(true);

    const { showConfirm, ConfirmComponent } = useConfirm();
    const uniqueId = uuidv4();
    
    // use useCallBack for getRandomItem so the function is not created every time the component re-executes, creating a loop in useEffect
    const getRandomItem = useCallback(()=>{
        if (gridItems.length === 0) return null
        const randomIndex= Math.floor(Math.random()* gridItems.length);
        return gridItems[randomIndex];
    },[gridItems])

    // destructure useGameHook from customHooks file
    const {startIntervals, clearIntervals} = useGameIntervals(getRandomItem, setRandomItem,setTimer)
   

    useEffect(()=>{
        if(userAuth.accessToken && userAuth.userId){
            getGridItem(setGridItems, userAuth.accessToken, navigate);
            getUserName(userAuth.userId,userAuth.accessToken, setUserName)
        }
    },[userAuth.accessToken, userAuth.userId,navigate])


    useEffect(() => {
        if (!showModal && gridItems.length > 0 && !gameOver) {
            startIntervals();
            setRandomItem(getRandomItem());
        }
        return () => clearIntervals();
    }, [gridItems, gameOver, showModal, startIntervals, clearIntervals,getRandomItem]);
    
    useEffect(()=>{
        if(timer <= 0){
            clearIntervals();
            setMessage("I knew it! Time is up... Try again!")
            setGameOver(true);
            setScore((prevScore) => [...prevScore, { id: uniqueId, score: 0 }]);
        }
    },[timer, uniqueId, clearIntervals, setScore])
    


    async function handleClick(itemId){
        if (!randomItem) return; 
        const randomIndexMessage = Math.floor(Math.random()* wrongItemMessage.length);
        
        if(itemId === randomItem.id){
            const timeTaken = initialTime - timer;
            console.log(timeTaken);
            setMessage("Good job! You're not that bad after all.");
            setGameOver(true);
            setScore((prevScore) => [...prevScore, {id:uniqueId, score: timeTaken, userName, userId: userAuth.userId}]);
            clearIntervals();
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
        startIntervals();
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
            const userConfirmedAction = await showConfirm(); // confirmation box 
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
            
            <ConfirmComponent/>
        </>
    )
}

Game.propTypes = {
    score: PropTypes.any,
    setScore: PropTypes.any,
    
  }