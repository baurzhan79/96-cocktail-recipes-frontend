import {
    COCKTAILS_REQUEST, COCKTAILS_SUCCESS, COCKTAILS_ERROR,
    GET_COCKTAIL_SUCCESS, GET_USER_COCKTAILS_SUCCESS
} from "../actionTypes";

const initialState = {
    loading: false,
    error: null,
    cocktails: [],
    selectedCocktail: null,
    userCocktails: []
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case COCKTAILS_REQUEST:
            return { ...state, loading: true, selectedCocktail: null, error: null }

        case COCKTAILS_SUCCESS:
            return { ...state, loading: false, cocktails: action.responseItems, error: null }

        case COCKTAILS_ERROR:
            return { ...state, loading: false, error: action.error }

        case GET_COCKTAIL_SUCCESS:
            return { ...state, loading: false, selectedCocktail: action.responseItem }

        case GET_USER_COCKTAILS_SUCCESS:
            return { ...state, loading: false, userCocktails: action.responseItems, error: null }

        default:
            return state;
    }
};

export default cocktailsReducer;