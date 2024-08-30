import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

export function useConfirm() {
    const [isVisible, setIsVisible] = useState(false);
    const [resolvePromise, setResolvePromise] = useState(null);

    const showConfirm = () => {
        return new Promise((resolve) => {
            setResolvePromise(() => resolve);
            setIsVisible(true);
        });
    };

    const handleConfirm = () => {
        setIsVisible(false);
        if (resolvePromise) {
            resolvePromise(true);
        }
    };

    const handleCancel = () => {
        setIsVisible(false);
        if (resolvePromise) {
            resolvePromise(false);
        }
    };

    const ConfirmComponent = () => (
        isVisible ? (
            <ConfirmModal
                message="Are you sure you want to delete your account?"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        ) : null
    );

    return {
        showConfirm,
        ConfirmComponent
    };
}