import { classNames } from 'shared/lib/classNames/classNames';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';

interface LoginModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal(props: LoginModalProps) {
    const { className, isOpen, onClose } = props;
    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('LoginForm', {}, [className])}
        >
            <Suspense fallback={<Loader />}>
                <LoginFormAsync />
            </Suspense>
        </Modal>
    );
}
