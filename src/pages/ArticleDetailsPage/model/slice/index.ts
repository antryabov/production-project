import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsCommentsReducer } from './articleDetailsCommentsSlice';
import { ArticleDetailsRecommendationsReducer } from './articleDetailsRecommendationsSlice';
import { ArticleDetailsPageSchema } from '../types';

export const articlesDetailsPageReducer = combineReducers<ArticleDetailsPageSchema>({
    recommendations: ArticleDetailsRecommendationsReducer,
    comments: ArticleDetailsCommentsReducer,
});
