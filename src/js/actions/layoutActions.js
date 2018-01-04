import {TOGGLE_MENU, TOGGLE_SIDEBAR} from './types';

export function toggleMenu() {
    return {
        type: TOGGLE_MENU
    };
}

export function toggleSidebar() {
    return {
        type: TOGGLE_SIDEBAR
    };
}