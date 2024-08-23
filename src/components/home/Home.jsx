import { useContext } from 'react'
import { ScoreContext } from '../../App'
import Game from '../game/Game'
import Header from '../header/Header'
import './Home.css'

export default function Home(){

    const {score , setScore} = useContext(ScoreContext)
    return(
        <>
            <Header/>
            <Game setScore={setScore} score={score}/>
        </>
    )
}