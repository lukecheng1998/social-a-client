import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types'
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            //console.log(res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');//go to the next state
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/signup', newUserData)
        .then(res => {
            //console.log(res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');//go to the next state
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const logoutUser = () => (dispatch) => {//Clears out the user state and returns the initial state
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data//data sent to reducer
            })
        })
        .catch(err => console.log(err));
}
const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}