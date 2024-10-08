import { classNames } from 'shared/lib/classNames/classNames';
import Text from 'shared/ui/Text/Text';
import EyeIcon from 'shared/assets/icons/eye.svg';
import Icon from 'shared/ui/Icon/Icon';
import { Card } from 'shared/ui/Card/Card';
import Avatar from 'shared/ui/Avatar/Avatar';
import Button, { ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AppLink from 'shared/ui/AppLink/AppLink';
import cls from './ArticleListItem.module.scss';
import {
    Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import ArticleTextBlockComponent from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
    className?: string;
    article: Article
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget
}
function ArticleListItem(props: ArticleListItemProps) {
    const {
        className,
        article,
        target,
        view = ArticleView.TILE,
    } = props;
    const { t } = useTranslation();

    const types = <Text text={article.type.join(', ')} className={cls.types} />;

    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find((block) => (
            block.type === ArticleBlockType.TEXT
        )) as ArticleTextBlock;

        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} />
                    {types}
                    <img src={article.img} className={cls.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            target={target}
                            to={RoutePath.article_details + article.id}
                        >
                            <Button
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('read_continue')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            target={target}
            to={RoutePath.article_details + article.id}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card
                className={cls.card}
            >
                <div className={cls.imageWrapper}>
                    <img src={article.img} className={cls.img} alt={article.title} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
}

export default memo(ArticleListItem);
