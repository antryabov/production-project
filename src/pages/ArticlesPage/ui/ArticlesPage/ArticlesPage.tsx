import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

function ArticlesPage(props: ArticlesPageProps) {
    const { className } = props;

    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList
                view={ArticleView.LIST}
                articles={[]}
            />
        </div>
    );
}

export default memo(ArticlesPage);
