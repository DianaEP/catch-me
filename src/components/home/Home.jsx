import { useContext } from 'react'
import { ScoreContext } from '../../App'
import Game from '../game/Game'
import Header from '../header/Header'
import './Home.css'
import Score from '../score/Score'

export default function Home(){

   
    return(
        <>
            <Header/>
            {/* <Score/> */}
            <Game/>
        </>
    )
}