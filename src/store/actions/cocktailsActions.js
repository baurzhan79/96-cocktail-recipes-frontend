import axiosApi from "../../axiosApi";
import { push } from "connected-react-router";

import { GET_COCKTAILS_SUCCESS, CREATE_COCKTAIL_SUCCESS } from "../actionTypes";

export const getCocktailsSuccess = cocktails => {
    return { type: GET_COCKTAILS_SUCCESS, cocktails };
};

export const getCocktails = () => {
    return dispatch => {
        return axiosApi.get("/cocktails").then(
            response => {
                dispatch(getCocktailsSuccess(response.data))
            }
        );
    };
};

export const createCocktailSuccess = () => {
    return { type: CREATE_COCKTAIL_SUCCESS };
};

export const createCocktail = cocktailData => {
    return async dispatch => {
        await axiosApi.post("/cocktails", cocktailData);
        dispatch(createCocktailSuccess());
        dispatch(push("/"));
        window.location.reload();
    };
};