import { useContext } from 'react'
import './Score.css'
import { ScoreContext } from '../../App'

export default function Score(){
    const {score} = useContext(ScoreContext);
    return(
        <>
            <div className="score-container">
                {score}
            </div>
        </>
    )
}