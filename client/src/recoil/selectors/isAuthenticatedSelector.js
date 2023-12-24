import {selctor} from 'recoil';
import { currentUserState } from '../atoms/userAtoms/userState';

export const isAuthenticatedSelector = selctor({
    key: 'isAuthenticatedSelector',
    get: ({get}) => {
        const currentUser = get(currentUserState);

        return currentUser !== null;
    },
});