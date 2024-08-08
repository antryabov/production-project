import { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';
import { profileReducer, profileAction } from './model/slice/profileSlice';
import { ProfileSchema, Profile } from './model/types/profileSchema';
import ProfileCard from './ui/ProfileCard';

export {
    Profile,
    ProfileSchema,
    profileReducer,
    profileAction,
    fetchProfileData,
    ProfileCard,
};
