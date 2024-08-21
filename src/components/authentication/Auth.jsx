import { Link } from 'react-router-dom';
import './Auth.css';
import PropTypes from 'prop-types';
import FormValidation from './FormValidation';

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
    const fields = loginRegisterFields[currentPage];

    const data = currentPage === 'login' ? dataLogin : dataRegister;
    const setData = currentPage === 'login' ? setDataLogin : setDataRegister;

    const { errors, validateData, inputChange } = FormValidation({ data, setData });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateData()) {
            console.log('Form is valid');
        }
    };
    return(
        <>
        <div className="form-container" >
            <form className='form-fields' onSubmit={handleSubmit}>
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