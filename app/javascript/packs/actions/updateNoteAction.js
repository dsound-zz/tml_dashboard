import axios from "axios";
import qs from "qs";

export const updateNote = (entry, isPublic, serviceId, userId, noteId) => (dispatch) => {
  let token = localStorage.getItem('token')
  axios
    .patch(
      `/api/v1/notes/${noteId}`,
      qs.stringify({
        entry: entry,
        is_public: isPublic,
        service_id: serviceId,
        user_id: 2}),
        { headers: { "Authorization" : token } })
      .then((res) => {
      const updatedNote = res.data;
      dispatch({ type: "UPDATE_NOTE", payload: updatedNote });
    })
    .catch((res) => console.log(res.errors));
};
