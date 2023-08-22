import axios from "../../axiosApi";
import { push } from "connected-react-router";

import {
    COCKTAILS_REQUEST, COCKTAILS_SUCCESS, COCKTAILS_ERROR, GET_COCKTAIL_SUCCESS, GET_USER_COCKTAILS_SUCCESS
} from "../actionTypes";

export const cocktailsRequest = () => (
    { type: COCKTAILS_REQUEST }
);

export const cocktailsSuccess = responseItems => (
    { type: COCKTAILS_SUCCESS, responseItems }
);

export const cocktailsError = (error) => (
    { type: COCKTAILS_ERROR, error }
);

export const getCocktailSuccess = responseItem => (
    { type: GET_COCKTAIL_SUCCESS, responseItem }
);

export const getUserCocktailsSuccess = responseItems => (
    { type: GET_USER_COCKTAILS_SUCCESS, responseItems }
);

export const cocktailsGetItems = () => {
    return async dispatch => {
        dispatch(cocktailsRequest());
        try {
            const response = await axios.get("/cocktails");
            let items = [];
            if (response.status === 200) { // OK
                if (response.data !== null) {
                    items = [...response.data];
                }
            }
            dispatch(cocktailsSuccess(items));

        } catch (error) {
            dispatch(cocktailsError(error));
        }
    }
};

export const userCocktailsGetItems = userId => {
    return async dispatch => {
        dispatch(cocktailsRequest());
        try {
            const response = await axios.get(`/cocktails?user=${userId}`);
            let items = [];
            if (response.status === 200) { // OK
                if (response.data !== null) {
                    items = [...response.data];
                }
            }
            dispatch(getUserCocktailsSuccess(items));

        } catch (error) {
            dispatch(cocktailsError(error));
        }
    }
};

export const addNewCocktail = (cocktail, userToken) => {
    return async dispatch => {
        dispatch(cocktailsRequest());
        try {
            await axios.post("/cocktails", cocktail, { headers: { Authorization: userToken } });
            dispatch(push("/"));
            window.location.reload();

        } catch (error) {
            dispatch(cocktailsError(error));
        }
    }
};

export const getCocktail = id => {
    return async dispatch => {
        dispatch(cocktailsRequest());
        try {
            const response = await axios.get(`/cocktails/${id}`);
            if (response.status === 200) { // OK
                if (response.data !== null) {
                    dispatch(getCocktailSuccess(response.data));
                }
            }

        } catch (error) {
            dispatch(cocktailsError(error));
        }
    }
};