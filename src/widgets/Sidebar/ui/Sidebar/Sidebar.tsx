import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import Button, { ButtonTheme, ButtonSize } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import LangSwitcher from '../../../LangSwitcher/ui/LangSwitcher';
import ThemeSwitcher from '../../../ThemeSwitcher/ui/ThemeSwitcher';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import SidebarItem from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
	className?: string;
}
function Sidebar({ className }: SidebarProps) {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            key={item.path}
            item={item}
            collapsed={collapsed}
        />
    )), [collapsed, sidebarItemsList]);

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, {
                [cls.collapsed]: collapsed,
            }, [
                className,
            ])}
        >
            <Button
                data-testid="sidebar-toggle"
                theme={ButtonTheme.BACKGROUND_INVERTED}
                onClick={onToggle}
                className={cls.collapseBtn}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                {itemsList}
            </div>
            <div className={cls.switchers}>
                <LangSwitcher short={collapsed} className={cls.lang} />
                <ThemeSwitcher />
            </div>
        </aside>
    );
}

export default memo(Sidebar);
