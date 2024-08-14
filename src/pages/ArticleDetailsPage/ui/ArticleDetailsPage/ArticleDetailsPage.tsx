import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}
function ArticleDetailsPage(props: ArticleDetailsPageProps) {
    const { className } = props;
    const { t } = useTranslation('article');

    return (
        <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            {t('article.articles_details')}
        </div>
    );
}
export default memo(ArticleDetailsPage);
