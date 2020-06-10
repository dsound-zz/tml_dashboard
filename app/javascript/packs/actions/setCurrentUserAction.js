import axios from 'axios';
import qs from 'qs';

export const setCurrentUser = (username, password) => dispatch => {
    axios.post('/api/v1/login', 
    qs.stringify({
        username: username, 
        password: password
    })
    )
    .then(res => {
        localStorage.setItem('token', res.data.token) 
        debugger 
        const currentUser = res.data.user
        dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
    })
    .catch((res) => console.log(res.errors));
};