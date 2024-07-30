import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
	className?: string;
}

export function Navbar({ className }: NavbarProps) {
    const { t } = useTranslation();
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    // Все функции, которые передаются пропсами их лучше мемоизировать
    const onToggleModal = useCallback(() => {
        setIsAuthOpen((prev) => !prev);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onToggleModal}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthOpen} onClose={onToggleModal}>
                lorem
            </Modal>
        </div>
    );
}
