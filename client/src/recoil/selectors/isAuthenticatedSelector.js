import {selctor} from 'recoil';
import { userState } from '../atoms/userAtoms/userState.js';

export const isAuthenticatedSelector = selctor({
    key: 'isAuthenticatedSelector',
    get: ({get}) => {
        const currentUser = get(userState);

        return currentUser !== null;
    },
});