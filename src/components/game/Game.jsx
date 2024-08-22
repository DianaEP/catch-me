import './Game.css'
import { gridItems } from '../../data'
import { useEffect, useState } from 'react';
import imageSrc from '../../assets/kitty.svg'

export default function Game(){
    const initialRandomIndex= Math.floor(Math.random()* gridItems.length);
    const initialRandomItem = gridItems[initialRandomIndex];

    const [randomItem, setRandomItem] = useState(initialRandomItem);

    useEffect(()=>{
        const intervalId = setInterval(()=>{
            const randomIndex =  Math.floor(Math.random()* gridItems.length);
            setRandomItem(gridItems[randomIndex])
        },500);

        return ()=> clearInterval(intervalId);
    },[])

    
    return(
        <>
            <div className="game-container">
                {gridItems.map((item)=>(
                    <div key={item.id} className='grid-item'>
                        {item.id === randomItem.id && (  
                            <img
                              src={imageSrc}
                              alt="Randomly Moved Image"
                              className='random-img'
                            />
                    )}</div>    
                ))}
                
            </div>
        </>
    )
}