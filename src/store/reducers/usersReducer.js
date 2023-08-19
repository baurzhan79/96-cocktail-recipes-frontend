import { LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actionTypes";

const initialState = {
    loginError: null,
    user: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.user, loginError: null };

        case LOGIN_USER_FAILURE:
            return { ...state, loginError: action.error };

        case LOGOUT_USER:
            return { ...state, user: null };

        default:
            return state;
    }
};

export default usersReducer;