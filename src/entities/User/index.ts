import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { userActions, userReducer } from './model/slice/userSlice';
import { UserSchema, User } from './model/types/UserSchema';

export {
    userReducer,
    userActions,
    User,
    UserSchema,
    getUserAuthData,
};
