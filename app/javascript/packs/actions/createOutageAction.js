import axios from "axios";
import qs from "qs";

export const createOutage = (
  startTime,
  endTime,
  frequency,
  isRecurring,
  reason,
  serviceId
) => (dispatch) => {
  let token = localStorage.getItem('token');
  axios
    .post(
      "/api/v1/outages",
      qs.stringify({
        start_time: startTime,
        end_time: endTime,
        frequency: frequency,
        is_recurring: isRecurring,
        reason: reason,
        service_id: serviceId,
        
      }), 
      { headers: { Authorization: token } }
    )
    .then((res) => {
      const newOutage = res.data;
      dispatch({ type: "CREATE_OUTAGE", payload: newOutage });
    })
    .catch((res) => console.log(res.errors));
};
