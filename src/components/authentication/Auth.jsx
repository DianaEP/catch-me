import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import PropTypes from 'prop-types';
import FormValidation from './FormValidation';
import { useContext } from 'react';
import { AuthContext } from '../../App';

const loginRegisterFields = {
    login: [
        { placeholder: 'email', type: 'text'},
        { placeholder: 'password', type: 'password'}
    ],
    register: [
        { placeholder: 'firstName', type: 'text'},
        { placeholder: 'lastName', type: 'text'},
        { placeholder: 'email', type: 'email'},
        { placeholder: 'password', type: 'password'},
        { placeholder: 'confirmPassword', type: 'password'},
    ]
}

async function register(dataRegister,navigate){
    try{
        const response = await fetch('http://localhost:3000/register',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              //   Authorization: `Bearer ${userAuth.token}`,
              },
            body: JSON.stringify(dataRegister)
        })
        console.log(response);
        navigate('/login')
        
    }catch(error){
        console.error('failed to fetch register'+ error)
    }
}

async function login(dataLogin,navigate, setUserAuth){
    try{
        const response = await fetch('http://localhost:3000/login',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${userAuth.token}`,
              },
            body: JSON.stringify(dataLogin)
        })
        const body = await response.json();
        if(response.ok){
            localStorage.setItem('accessToken' , body.accessToken);
            localStorage.setItem('userId' , body.user.id);
            setUserAuth({
                accessToken : body.accessToken,
                userId : body.user.id
            })
            navigate('/')
            console.log(body);

        }
        
    }catch(error){
        console.error('failed to fetch register'+ error)
    }
}


export default function Auth({currentPage,text,nextPage, dataLogin,dataRegister, setDataLogin, setDataRegister}){
    const {userAuth, setUserAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const fields = loginRegisterFields[currentPage];

    const data = currentPage === 'login' ? dataLogin : dataRegister;
    const setData = currentPage === 'login' ? setDataLogin : setDataRegister;

    const { errors, validateData, inputChange } = FormValidation({ data, setData });


    console.log('auth'+userAuth.accessToken);

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        const {confirmPassword, ...restDataRegister} = dataRegister;
        if(dataRegister.password !== confirmPassword){
            console.log("password don't match");
            
            
        }
        if (validateData()) {
            register(restDataRegister,navigate)
            console.log('Form is valid');
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (validateData()) {
            login(dataLogin,navigate,setUserAuth);
            console.log('Form is valid');
        }
    };
    return(
        <>
        <div className="form-container" >
            <form className='form-fields' onSubmit={currentPage === 'register' ? handleSubmitRegister : handleSubmitLogin}>
                <h2>{currentPage}</h2>
                {fields.map((field, index)=>(
                    <div key={index} className='input-container'>
                        <input  
                           type={field.type} 
                           placeholder={field.placeholder} 
                           name={field.placeholder} 
                           value={data[field.placeholder]} 
                           onChange={inputChange}
                           className={errors[field.placeholder] ? 'invalid-shadow' : ''}
                        />
                        {errors[field.placeholder] && (
                            <span className="error-message">{errors[field.placeholder]}</span>
                        )} 

                    </div>
                     
                
                ))}
                
                <button className='form-button'>{currentPage}</button>
            </form>
            <div className="link-container">
                <p><span>{text}</span> <Link to={`/${nextPage}`}>{nextPage}</Link></p>
            </div>
            
            </div> 
        </>
    )
}



Auth.propTypes = {
    currentPage: PropTypes.any,
    nextPage: PropTypes.any,
    text: PropTypes.any,
    dataLogin: PropTypes.any,
    dataRegister: PropTypes.any,
    setDataLogin: PropTypes.any,
    setDataRegister : PropTypes.any
};