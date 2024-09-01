import { articlesDetailsPageReducer } from './model/slice';
import { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
import { ArticleDetailsPageSchema } from './model/types/index';
import { ArticleDetailsPageAsync } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';

export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
    ArticleDetailsCommentsSchema,
    ArticleDetailsRecommendationsSchema,
    ArticleDetailsPageSchema,
    articlesDetailsPageReducer,
};
