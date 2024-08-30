import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import PropTypes from 'prop-types';
import FormValidation from './FormValidation';
import { useContext, useState } from 'react';
import { AuthContext } from '../../App';
import { register } from '../../fetch';
import { login } from '../../fetch';
import Header from '../header/Header';
import AlertModal from '../alert-modal/AlertModal';

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



export default function Auth({currentPage,text,nextPage, dataLogin,dataRegister, setDataLogin, setDataRegister}){
    const {setUserAuth} = useContext(AuthContext);
    const navigate = useNavigate();
    const fields = loginRegisterFields[currentPage];
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const data = currentPage === 'login' ? dataLogin : dataRegister;
    const setData = currentPage === 'login' ? setDataLogin : setDataRegister;

    const { errors, validateData, inputChange } = FormValidation({ data, setData });


    // console.log('auth'+userAuth.accessToken);

    const handleSubmitRegister = (e) => {
        e.preventDefault();
        const {confirmPassword, ...restDataRegister} = dataRegister;
        if(dataRegister.password !== confirmPassword){
            setAlertMessage("Password don't match!")
            setShowAlert(true);
            return;   
        }

        if (validateData()) {
            register(restDataRegister,navigate,setUserAuth, (message) =>{
                setAlertMessage(message);
                setShowAlert(true);
            })
            console.log('Form is valid');
        }
    };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        if (validateData()) {
            login(dataLogin,navigate,setUserAuth,(message) =>{
                setAlertMessage(message);
                setShowAlert(true);
            });
            console.log('Form is valid');
        }
    };

    const closeAlert = () => {
        setShowAlert(false);
        setAlertMessage('');
    };



    return(
        
        <div className="wrapper">
            <Header/>
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
            {showAlert && (
                <AlertModal onClose={closeAlert}>
                    <p className='alert-msg'>{alertMessage}</p>
                </AlertModal>
            )}
        </div>
        
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