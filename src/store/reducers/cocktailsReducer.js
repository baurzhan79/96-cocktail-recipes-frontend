import { GET_COCKTAILS_SUCCESS } from "../actionTypes";

const initialState = {
    cocktails: []
};

const cocktailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COCKTAILS_SUCCESS:
            return { ...state, cocktails: action.cocktails };

        default:
            return state;
    }
};

export default cocktailsReducer;