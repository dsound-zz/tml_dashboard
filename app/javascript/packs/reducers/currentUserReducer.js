const initialState = {
  currentUser: null,
};

export const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_USER": 
            return { ...state, currentUser: action.payload }
        case "GET_CURRENT_USER":
            return { currentUser: action.payload }
        case "CLEAR_CURRENT_USER":
            return { currentUser: action.payload }
    default:
        return state;  
    }
};
