import { Link, LinkProps } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo, PropsWithChildren, ReactNode } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
	PRIMARY = 'primary',
	SECONDARY = 'secondary',
    RED = 'red'
}

interface AppLinkProps extends LinkProps {
	className?: string;
	theme?: AppLinkTheme;
    children?: ReactNode
}

function AppLink(props: PropsWithChildren<AppLinkProps>) {
    const {
        className,
        children,
        to,
        theme = AppLinkTheme.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[theme]])}
            to={to}
            {...otherProps}
        >
            {children}
        </Link>
    );
}

export default memo(AppLink);
