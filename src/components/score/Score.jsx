import { useContext, useEffect } from 'react'
import './Score.css'
import { AuthContext, ScoreContext } from '../../App'

async function getScore(setScore, token){
    try{
        const response= await fetch('http://localhost:3000/score',{
            headers: {
                 Authorization: `Bearer ${token}`,
                 'Content-Type': 'application/json',
            }
        }
        )
        const data = await response.json();
        setScore(data)
        console.log(token);
        
    }catch(error){
        console.error('Error fetching scores:', error)
    }
}

export default function Score(){
    const {score, setScore} = useContext(ScoreContext);
    const {userAuth} = useContext(AuthContext);
    console.log(userAuth);
    console.log(userAuth.accessToken);
    useEffect(()=>{
        getScore(setScore, userAuth.accessToken);
    },[])

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
                <ul>
                    {firstFiveScores.map((scoreEntry) => (
                        <li key={scoreEntry.id}>
                            Score: {scoreEntry.score}s
                        </li>
                    ))}
                </ul>
            )}
                </ul>
            </div>
        </>
    )
}