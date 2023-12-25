import { selector } from 'recoil';
import { userState, errorState, loadingState } from './userAtoms';

export const userSelector = selector({
  key: 'userSelector',
  get: ({ get }) => {
    const currentUser = get(userState);
    const error = get(errorState);
    const loading = get(loadingState);

    return { currentUser, error, loading };
  },
});