import axios from "../../axiosApi";

import { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER } from "../actionTypes";

export const loginUserSuccess = user => {
    return { type: LOGIN_USER_SUCCESS, user };
};

export const loginUserFailure = error => {
    return { type: LOGIN_USER_FAILURE, error };
};

export const facebookLogin = data => {
    return async dispatch => {
        try {
            const response = await axios.post("/users/facebookLogin", data);
            dispatch(loginUserSuccess(response.data.user));
        }
        catch (error) {
            if (error.response && error.response.data) dispatch(loginUserFailure(error.response.data));
            else dispatch(loginUserFailure({ global: "No internet" }));
        }
    };
};

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const headers = { "Authorization": token };
        await axios.delete("/users/sessions", { headers });
        dispatch({ type: LOGOUT_USER });
    }
};