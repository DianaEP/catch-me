import './ConfirmModal.css';
import { AiOutlineCloseSquare } from "react-icons/ai";
import PropTypes from 'prop-types';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
    return (
        <div className="confirm-container">
            <div className="confirm-content">
                <button onClick={onCancel} className='svg-button'>
                    <AiOutlineCloseSquare />
                </button>
                <p>{message}</p>
                <div className="confirm-buttons">
                    <button onClick={onConfirm} className="button confirm-button">Confirm</button>
                    <button onClick={onCancel} className="button cancel-button">Cancel</button>
                </div>
            </div>
        </div>
    );
}

ConfirmModal.propTypes = {
    message: PropTypes.any,
    onConfirm: PropTypes.any,
    onCancel: PropTypes.any,
    
  }