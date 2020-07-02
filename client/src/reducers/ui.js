import {
    SHOW_SETTINGS_MODAL,
    HIDE_SETTINGS_MODAL, SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL
} from "../actions/types";

const initialState = {
    showSettingsModal: false,
    showLoginModal: false
};

// function that choses what does the dispatched action
export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SHOW_SETTINGS_MODAL:
            return {
                ...state,
                showSettingsModal: true
            };
        case HIDE_SETTINGS_MODAL:
            return {
                ...state,
                showSettingsModal: false
            };
        case SHOW_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: true
            };
        case HIDE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModal: false
            };

        default:
            return state;
    }
}
