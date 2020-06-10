import axios from "axios";
import qs from "qs";

export const deleteNote = (serviceNoteId, currentUser)=> dispatch => {
  let token = localStorage.getItem('token')
    axios
      .delete(`/api/v1/notes/${serviceNoteId}`, { data: {
      curr_user: currentUser
    },
     headers: { "Authorization": token }, 
  })
      .then((res) => {
        const deletedNoteId = res.data;
   
        dispatch({ type: "DELETE_NOTE", payload: deletedNoteId });
      })
      .catch((res) => console.log(res.errors));
    
}