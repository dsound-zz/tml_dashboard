import axios from "axios";

export const getCurrentUser = token => dispatch => {
    axios.get('/api/v1/current_user', { headers: { Authorization: token } })
    .then(res => {
        console.log("made it")
        let currentUser = res.data.currentUser; 
        console.log(res.data.currentUser)

         dispatch({ type: "GET_CURRENT_USER", payload: currentUser })
    })
    .catch((res) => console.log("error"));
}

