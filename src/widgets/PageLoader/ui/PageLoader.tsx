import { Loader } from 'shared/ui/Loader/Loader';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
className?: string;
}
function PageLoader({ className }: PageLoaderProps) {
    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
}

export default memo(PageLoader);
