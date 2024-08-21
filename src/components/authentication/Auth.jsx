import { Link } from 'react-router-dom';
import './Auth.css';
import PropTypes from 'prop-types';

const loginRegisterFields = {
    login: [
        { placeholder: 'email', type: 'text'},
        { placeholder: 'password', type: 'password'}
    ],
    register: [
        { placeholder: 'name', type: 'text'},
        { placeholder: 'surname', type: 'text'},
        { placeholder: 'email', type: 'email'},
        { placeholder: 'password', type: 'password'},
        { placeholder: 'confirmPassword', type: 'password'},
    ]
}


export default function Auth({currentPage,text,nextPage, dataLogin,dataRegister, handleLoginChange, handleRegisterChange}){
    const fields = loginRegisterFields[currentPage]
    return(
        <>
        <div className="form-container">
            <form className='input-fields'>
                {fields.map((field, index)=>(
                    <input key={index} 
                           type={field.type} 
                           placeholder={field.placeholder} 
                           name={field.placeholder} 
                           value={currentPage === 'login' ? dataLogin[field.placeholder] : dataRegister[field.placeholder]} 
                           onChange={currentPage ==='login' ? handleLoginChange : handleRegisterChange}/>
                ))

                }
                
                <button>{currentPage}</button>
            </form>
            <div>

            </div>
                <div className="link-container">
                        <p><span>{text}</span> <Link to={`/${nextPage}`}>{nextPage}</Link></p>
                    </div>
            
            </div> 
        </>
    )
}

// value={{dataLogin.`${placeholder}`}}

Auth.propTypes = {
    currentPage: PropTypes.any,
    nextPage: PropTypes.any,
    text: PropTypes.any,
    dataLogin: PropTypes.any,
    dataRegister: PropTypes.any,
    handleLoginChange: PropTypes.any,
    handleRegisterChange : PropTypes.any
};