import { createContext } from 'react';

export const Context = createContext();
export const initialState = {
    user: ''
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    };
};

export default Reducer;
