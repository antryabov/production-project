import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article, ArticleType } from 'entities/Article';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import {
    getArticlesLimit, getArticlesOrder, getArticlesPageNum, getArticlesSearch, getArticlesSort,
    getArticlesType,
} from '../../selectors/articles';

interface FetchArticlesListProps {
    // в fullfilled стоит addMany и все данные в конец
    // но для фильтрации на не нужно в конец, нам нужно перезаписать данные
    replace?: boolean;
}

// <возвращаемое тип, тип аргумента, ThunkConfig>
// async thunk - являются action'нами
export const fetchArticlesList = createAsyncThunk<
    Article[], // получение данных
    FetchArticlesListProps,
    ThunkConfig<string> // thunkApi
    >(
        'articlesPage/fetchArticlesList',
        async (props, thunkAPI) => {
            const { extra, rejectWithValue, getState } = thunkAPI;
            const { replace } = props;

            const order = getArticlesOrder(getState());
            const sort = getArticlesSort(getState());
            const search = getArticlesSearch(getState());
            const limit = getArticlesLimit(getState());
            const page = getArticlesPageNum(getState());
            const type = getArticlesType(getState());

            try {
                addQueryParams({
                    sort, order, search, type,
                });
                const response = await extra.api.get<Article[]>('/articles/', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _sort: sort,
                        _order: order,
                        q: search,
                        type: type === ArticleType.ALL ? undefined : type,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (error) {
                console.log(error);
                return rejectWithValue('error');
            }
        },
    );
