import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getScrollSave = (state: StateSchema) => state.scrollSave.scroll;
export const getScrollSaveByPath = createSelector(
    getScrollSave,
    // принимает стейт и путь
    (state: StateSchema, path: string) => path,
    // возвращает позицию
    (scroll, path) => scroll[path] || 0,
);

// const scrollPosition = useSelector((state: StateSchema) => getScrollSaveByPath(state, pathname));
