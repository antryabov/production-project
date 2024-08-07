import { FC, lazy } from 'react';
import { ProfilePageProps } from './ProfilePage';

export const ProfilePageAsync = lazy<FC<ProfilePageProps>>(
    () => new Promise((resolve) => {
        setTimeout(() => resolve(import('./ProfilePage')), 1500);
    }),
);
