import { useContext } from 'react'
import './Score.css'
import { ScoreContext } from '../../App'

export default function Score(){
    const {score} = useContext(ScoreContext);
    console.log(score);
    
    return(
        <>
            <div className="score-container">
                <ul>
                {score.length === 0 ? (
                <p>No scores available.</p>
            ) : (
                <ul>
                    {score.map((scoreEntry) => (
                        <li key={scoreEntry.id}>
                            ID: {scoreEntry.id}, Score: {scoreEntry.score}
                        </li>
                    ))}
                </ul>
            )}
                </ul>
            </div>
        </>
    )
}