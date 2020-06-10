import axios from "axios";
import qs from "qs";

export const createNote = (entry, isPublic, serviceId, userId) => (dispatch) => { 
  let token = localStorage.getItem('token')
  axios
    .post(`/api/v1/notes`,
    qs.stringify({ 
      entry: entry, 
      is_public: isPublic,
      user_id: userId, 
      service_id: serviceId}),
    { headers: { "Authorization" : token } })
    .then(res => {
        const note = res.data;
        dispatch({ type: "CREATE_NOTE", payload: note })
    })
    .catch((res) => console.log(res.errors));
};
