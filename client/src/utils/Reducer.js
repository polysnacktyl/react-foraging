import { createContext } from 'react';

export const Context = createContext();

export const initialState = {
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
            };
        case 'loadImages':
            return {
                ...state,
                images: action.payload,
            };
        case 'displayImages':
            return {
                ...state,
                images: action.payload
            };
        default:
            return state;
    };
};

export default Reducer;
