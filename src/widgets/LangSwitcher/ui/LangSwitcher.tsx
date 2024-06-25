import { Button, ThemeButton } from 'shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

interface LangSwitcherProps {
	className?: string;
}
export function LangSwitcher({ className }: LangSwitcherProps) {
	const { t, i18n } = useTranslation();

	const toggleLang = () => {
		i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
	};

	return (
		<Button
			theme={ThemeButton.CLEAR}
			onClick={toggleLang}
			className={classNames(cls.LangSwitcher, {}, [className])}
		>
			{t('Язык')}
		</Button>
	);
}
