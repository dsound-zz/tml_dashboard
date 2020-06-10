const initialState = {
  outages: [],
};

export const outagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_OUTAGES":
      return { ...state, outages: action.payload };
    case "CREATE_OUTAGE":
         return Object.assign({}, state, {
           outages: [
             ...state.outages,
              action.payload
             
           ],
         });
    case "UPDATE_OUTAGE": 
        let updatedOutageIndex = state.outages.findIndex(outage => outage.id === action.payload.id)
        const outagesCopy = state.outages.slice();
        outagesCopy.splice(updatedOutageIndex, 1, action.payload)
        return { ...state, outages: outagesCopy };
    case "DELETE_OUTAGE": 
         const filteredOutages = state.outages.filter(outage => outage.id !== action.payload.outageId);
        return { ...state, outages: filteredOutages };
    default:
      return state;
  }
};
