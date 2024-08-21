import { useTranslation } from 'react-i18next';
import AppLink, { AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { SidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean
}

function SidebarItem(props: SidebarItemProps) {
    const {
        item,
        collapsed,
    } = props;
    const isAuth = useSelector(getUserAuthData);
    const { t } = useTranslation();

    // тот item, который не подходит под условия не будет отрисовываться
    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            className={classNames(cls.item, {
                [cls.collapsed]: collapsed,
            })}
            theme={AppLinkTheme.SECONDARY}
            to={item.path}
        >
            {/* компонент можно передавать так(в нашем случае это свг) */}
            <item.Icon className={cls.icon} />
            <span className={cls.link}>
                {t(item.text)}
            </span>
        </AppLink>
    );
}
// если пропсы не изменились, то компонент не перерисовывается
export default memo(SidebarItem);
