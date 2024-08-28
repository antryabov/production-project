import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
className?: string;
}
function NotFoundPage({ className }: NotFoundPageProps) {
    const { t } = useTranslation();
    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Page>
    );
}

export default memo(NotFoundPage);
