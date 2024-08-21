import { useState } from "react";

export default function FormValidation({data, setData}){

     // VALIDATIONS

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);

  const inputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setData({ ...data, [name]: trimmedValue });
  };

  const validateData = () =>{
    let isValid = true;
    let validationErrors = {};

    if(data.firstName === '' || data.firstName === null){
      isValid = false;
      validationErrors.firstName = 'First name required'
    }

    if(data.lastName === '' || data.lastName === null){
      isValid = false;
      validationErrors.lastName = 'Last name required'
    }

    if(data.email === '' || data.email === null){
      isValid = false;
      validationErrors.email = 'Email required'
    }else if(!/\S+@\S+\.\S+/.test(data.email)){
      isValid = false;
      validationErrors.email = 'Email is not valid'
    }

    if(data.password === '' || data.password === null){
      isValid = false;
      validationErrors.password = 'Password required'
    }

    if(data.confirmPassword === '' || data.confirmPassword === null){
      isValid = false;
      validationErrors.confirmPassword = 'Confirm password required'
    }

  

    setErrors(validationErrors);
    setValid(isValid);

    return isValid;
  }

  return {errors, valid, inputChange, validateData};
}