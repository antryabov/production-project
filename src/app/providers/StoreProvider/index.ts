import { createReduxStore, AppDispatch } from './config/store';
import {
    StateSchema, ReduxStoreWithManager, ThunkConfig, StateSchemaKey,
} from './config/StateSchema';
import { StoreProvider } from './ui/StoreProvider';

export {
    StoreProvider,
    createReduxStore,
    StateSchema,
    ReduxStoreWithManager,
    AppDispatch,
    ThunkConfig,
    StateSchemaKey,
};
