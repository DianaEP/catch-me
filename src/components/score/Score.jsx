import { useContext, useEffect } from 'react'
import './Score.css'
import { AuthContext, ScoreContext } from '../../App'
import { getScore } from '../../fetch';
import { FaPaw } from "react-icons/fa";




export default function Score(){
    const {score, setScore} = useContext(ScoreContext);
    const {userAuth} = useContext(AuthContext);
    

    
    // console.log(userAuth.accessToken);
    useEffect(() => {
        if (userAuth.accessToken) {
          getScore(setScore, userAuth.accessToken);
        }
      }, [userAuth.accessToken, setScore]);

    const firstFiveScores = score
        .sort((a,b) => a.score - b.score) // sort ascending
        .filter((scoreCurrElem, index) => 
            index === score.findIndex((s)=> s.score === scoreCurrElem.score)) // is finding the first index of an element in the score array  that has the same score as the current scoreCurrElem.
        .slice(0,5) // create a new array with the first 5

        // console.log(firstFiveScores);
        
    
    return(
        <>
            <div className="score-container">
                <ul>
                {score.length === 0 ? (
                <p>No scores available.</p>
            ) : (
            
                 <div className='top-five'>
                    <p>Top 5 scores</p>
                    <ul>
                        {firstFiveScores.map((scoreEntry, index) => (
                            <li key={scoreEntry.id}>
                                {index === 0 && (
                                    <FaPaw />
                                )}
                                {scoreEntry.userName}: {scoreEntry.score}s
                            </li>
                        ))}
                    </ul>
                </div>
                
            )}
                </ul>
            </div>
        </>
    )
}