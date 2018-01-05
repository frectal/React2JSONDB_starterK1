import {TOGGLE_MENU, TOGGLE_SIDEBAR} from '../actions/types';

const initialState = {
    isMenuVisible: false,
    isSidebarVisible: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
    case TOGGLE_MENU:
        return {
            ...state,
            isMenuVisible: !state.isMenuVisible
        };
    case TOGGLE_SIDEBAR:
        return {
            ...state,
            isSidebarVisible: !state.isSidebarVisible
        };
    default: return state;
    }
};