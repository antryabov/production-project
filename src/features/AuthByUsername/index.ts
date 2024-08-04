import { LoginModal } from './ui/LoginModal/LoginModal';
import { LoginSchema } from './model/types/loginSchema';
import { loginReducer } from './model/slice/loginSlice';

export {
    // отдаем только модалку, а форму мы изолируем внутри неё
    LoginModal,
    LoginSchema,
    loginReducer,
};
