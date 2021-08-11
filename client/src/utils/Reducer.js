import { createContext } from 'react';

export const Context = createContext();

export const initialState = {
    isLoading: false,
    user: '',
    images: []
}


export const Reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload
            };
        case 'logout':
            return {
                ...state,
                user: '',
                images: []
            };
        case 'fetchImages':
            return {
                ...state,
                isLoading: true
            };
        case 'fetchSuccess':
            return {
                ...state,
                images: action.payload,
                isLoading: false
            };
        case 'fetchFail':
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    };
};

export default Reducer;
