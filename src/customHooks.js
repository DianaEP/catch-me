import { useCallback, useRef } from "react";

export const useGameIntervals = (getRandomItem, setRandomItem, setTimer) => {
    const intervalRef = useRef({
        randomItemInterval: null,
        timerInterval: null
    });

    const startIntervals = useCallback(()=>{
        intervalRef.current.randomItemInterval= setInterval(()=>{
            setRandomItem(getRandomItem())
        },500);

        intervalRef.current.timerInterval= setInterval(()=>{
            setTimer(prevTime => prevTime - 1);
        },1000);
    },[getRandomItem, setRandomItem, setTimer])
        
    
    const clearIntervals = useCallback(()=>{
        clearInterval(intervalRef.current.randomItemInterval);
        clearInterval(intervalRef.current.timerInterval);
    },[])

    return {startIntervals, clearIntervals}

}