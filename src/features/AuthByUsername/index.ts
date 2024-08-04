import { loginReducer } from './model/slice/loginSlice';
import { LoginModal } from './ui/LoginModal/LoginModal';
import { LoginSchema } from './model/types/loginSchema';

export {
    // отдаем только модалку, а форму мы изолируем внутри неё
    LoginModal,
    loginReducer,
    LoginSchema,
};
