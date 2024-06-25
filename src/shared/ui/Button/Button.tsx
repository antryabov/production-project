import { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import cls from './Button.module.scss';
import { classNames } from 'shared/lib/classNames/classNames';

export enum ThemeButton {
	CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	children: ReactNode;
	theme?: ThemeButton;
}
export function Button(props: ButtonProps) {
	const { children, className, theme, ...otherProps } = props;
	return (
		<button
			className={classNames(cls.Button, {}, [cls[theme], className])}
			{...otherProps}
		>
			{children}
		</button>
	);
}
