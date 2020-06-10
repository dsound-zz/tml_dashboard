import axios from "axios";

export const getServices = () => dispatch => {
    
    axios
      .get("/api/v1/services")
      .then((res) => {
        const services = res.data;
        dispatch({ type: "GET_SERVICES", payload: services });
      })
      .catch((res) => console.log(res.errors));
};
