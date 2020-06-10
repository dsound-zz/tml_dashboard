import axios from "axios";

export const getOutages = () => (dispatch) => {
  axios
    .get(`/api/v1/outages`)
    .then((res) => {
      const outages = res.data;
      dispatch({ type: "GET_OUTAGES", payload: outages });
    })
    .catch((res) => console.log(res.errors));
};
