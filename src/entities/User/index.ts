import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserMounted } from './model/selectors/getUserMounted/getUserMounted';
import { userActions, userReducer } from './model/slice/userSlice';
import { UserSchema, User } from './model/types/UserSchema';

export {
    userReducer,
    userActions,
    User,
    UserSchema,
    getUserAuthData,
    getUserMounted,
};
