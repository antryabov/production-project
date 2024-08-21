import { FC, lazy } from 'react';
// @ts-ignore два одинаковых названия
import { addNewCommentProps } from './AddNewComment';

export const AddNewCommentAsync = lazy<FC<addNewCommentProps>>(
    () => new Promise((resolve) => {
    // @ts-ignore
        setTimeout(() => resolve(import('./AddNewComment')), 1500);
    }),
);
