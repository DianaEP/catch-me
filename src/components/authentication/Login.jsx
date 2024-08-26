import './Auth.css'
import { useState } from 'react'
import Auth from './Auth';

export default function Login(){
    const [dataLogin, setDataLogin] = useState({
        email: '',
        password: ''
    })

    // function handleLoginChange(e){
    //     const{value, name} = e.target;
    //     setDataLogin((prevInput)=>({
    //         ...prevInput,
    //         [name]:value
    //     }))
    // }

    // console.log(dataLogin);
    
    return(
        <>

           <Auth currentPage='login' text="Don't have an account?" nextPage='Register' dataLogin={dataLogin} setDataLogin={setDataLogin}/>
        </>
    )
}