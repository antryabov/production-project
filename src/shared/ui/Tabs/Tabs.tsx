import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode, useCallback } from 'react';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabsItem {
    value: string;
    content: ReactNode
}

interface TabsProps {
    className?: string;
    tabs: TabsItem[];
    value: string;
    onTabClick: (tab: TabsItem) => void
}
function Tabs(props: TabsProps) {
    const {
        className,
        tabs,
        value,
        onTabClick,
    } = props;

    const clickHandle = useCallback((tab: TabsItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                    onClick={clickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
}
export default memo(Tabs);
