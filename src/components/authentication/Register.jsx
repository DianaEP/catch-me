import './Auth.css'
import { useState } from 'react';
import Auth from './Auth';

export default function Register(){
    const [dataRegister, setDataRegister] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    
    return(
        <>
            <Auth currentPage='register' text="Do you have an account?" nextPage='login' dataRegister={dataRegister} setDataRegister={setDataRegister} />
        </>
    )
}


// function handleRegisterChange(e){
//     const{value, name} = e.target;
//     setDataRegister((prevInput)=>({
//         ...prevInput,
//         [name]:value
//     }))
// }
// console.log(dataRegister);