import axios from "axios";


export const deleteOutage = outageId => (dispatch) => {
  let token = localStorage.getItem('token')
  axios
    .delete(`/api/v1/outages/${outageId}`, { 'headers': { 'Authorization': token }})
    .then((res) => {
      const deletedOutageId = res.data;

      dispatch({ type: "DELETE_OUTAGE", payload: deletedOutageId });
    })
    .catch((res) => console.log(res.errors));
};
