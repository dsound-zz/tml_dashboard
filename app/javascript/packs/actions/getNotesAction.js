import axios from "axios";

let token;
export const getNotes = currentUser => (dispatch) => {
  if (localStorage.getItem('token') !== null) {
    token = localStorage.getItem('token') 
  }
  axios
    .get(`/api/v1/notes/`, { 'headers': { 'Authorization': token }} )
    
    .then((res) => {
      const notes = res.data;
      
      dispatch({ type: "GET_NOTES", payload: notes });
    })
    .catch((res) => console.log(res.errors))
};


