import { AiOutlineCloseSquare } from "react-icons/ai";
import './AlertModal.css'
import { useState } from "react";

export default function AlertModal({children, onClose}){


    return(
        <div className="alert-container">
            <button onClick={onClose}><AiOutlineCloseSquare /></button>
            {children}
        </div>
       
    )
}