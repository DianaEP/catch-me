import { AiOutlineCloseSquare } from "react-icons/ai";
import './AlertModal.css';
import PropTypes from 'prop-types';

export default function AlertModal({children, onClose}){


    return(
        <div className="alert-container">
            <div className="alert-content">
                <button onClick={onClose}><AiOutlineCloseSquare /></button>
                {children}
            </div>
        </div>
       
    )
}

AlertModal.propTypes = {
    children: PropTypes.any,
    onClose: PropTypes.any,
    
  }