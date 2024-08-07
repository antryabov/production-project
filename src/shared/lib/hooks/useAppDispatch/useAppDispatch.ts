import { AppDispatch } from 'app/providers/StoreProvider';
import { useDispatch } from 'react-redux';

// просто напросто типизированный dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
