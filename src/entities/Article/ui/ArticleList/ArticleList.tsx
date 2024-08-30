import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import ArticleListItem from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView
}

const getSkeletons = (view: ArticleView) => (
    new Array(view === ArticleView.TILE ? 9 : 3)
        .fill(0).map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
        ))
);

function ArticleList(props: ArticleListProps) {
    const {
        className,
        articles,
        isLoading,
        view = ArticleView.TILE,
    } = props;
    const { t } = useTranslation();

    const renderArticle = (article: Article) => (
        <ArticleListItem
            className={cls.card}
            key={article.id}
            view={view}
            article={article}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={TextSize.L} title={t('articles_notfound')} />
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.length > 0
                ? articles.map(renderArticle)
                : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
}
export default memo(ArticleList);
