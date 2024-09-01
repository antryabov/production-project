import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';

// EntityState - для нормализации данных, где есть поля ids и entities
export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
}
