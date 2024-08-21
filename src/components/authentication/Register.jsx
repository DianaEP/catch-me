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

    // function handleRegisterChange(e){
    //     const{value, name} = e.target;
    //     setDataRegister((prevInput)=>({
    //         ...prevInput,
    //         [name]:value
    //     }))
    // }
    // console.log(dataRegister);
    
    return(
        <>
            <Auth currentPage='register' text="Do you have an account?" nextPage='login' dataRegister={dataRegister} setDataRegister={setDataRegister} />
        </>
    )
}