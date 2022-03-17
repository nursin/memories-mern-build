import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

// actioncreators
export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user

        history.push('/');
    } catch (error) {
        console.log(error)
    }
}

export const signup = () => async (dispatch) => {
    try {
        // sign in in the user

        history.push('/');
    } catch (error) {
        console.log(error)
    }
}