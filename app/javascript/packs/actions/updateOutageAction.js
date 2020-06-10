import axios from "axios";
import qs from "qs";

export const updateOutage = (startTime, endTime, frequency, isRecurring, reason, serviceId, outageId) => (dispatch) => {
 let token = localStorage.getItem('token');
  axios
    .patch(
      `/api/v1/outages/${outageId}`,
      qs.stringify({
        start_time: startTime,
        end_time: endTime,
        service_id: serviceId,
        is_recurring: isRecurring,
        frequency: frequency,
        reason: reason,
      }), { 'headers': { 'Authorization': token } })
    .then((res) => {
      const updatedOutage = res.data;
      dispatch({ type: "UPDATE_OUTAGE", payload: updatedOutage });
    })
    .catch((res) => console.log(res.errors));
};
