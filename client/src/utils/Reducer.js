import { createContext } from 'react';

export const Context = createContext();

export const initialState = {
    errors: null, 
    isLoading: true,
    user: '',
    images: []
}

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload, 
                images: null, 
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
                images: action.payload, 
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
                errors: action.payload, 
                isLoading: false
            }
        default:
            return state;
    };
};

export default Reducer;
