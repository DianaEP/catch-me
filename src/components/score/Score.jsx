import { useContext, useEffect } from 'react'
import './Score.css'
import { ScoreContext } from '../../App'

async function getScore(setScore){
    try{
        const response= await fetch('http://localhost:3000/score')
        const data = await response.json();
        setScore(data)
    }catch(error){
        console.error('Error fetching scores:', error)
    }
}

export default function Score(){
    const {score, setScore} = useContext(ScoreContext);
    console.log(score);
    useEffect(()=>{
        getScore(setScore);
    },[])

    const firstFiveScores = score
        .sort((a,b) => a.score - b.score) // sort ascending
        .filter((scoreCurrElem, index) => 
            index === score.findIndex((s)=> s.score === scoreCurrElem.score)) // is finding the first index of an element in the score array  that has the same score as the current scoreCurrElem.
        .slice(0,5) // create a new array with the first 5

        console.log(firstFiveScores);
        
    
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