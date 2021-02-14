import {
    LOGIN_REQUEST,
    SENT,
    FAILURE,
    SUCCESS,
    GET_PROFILE_INFO,
    LOG_OUT,
    REGISTER_REQUEST, FILTER_WEIGHT_DATA, ADD_WEIGHT_RECORD, HIDE_RECORD_ERROR
} from "../../constants";
import {validatePassword, validateEmail} from "../../helpers";
import md5 from 'md5'

export const logOut = () => {
    return({
        type: LOG_OUT
    })
}

export const hideRecordError = () => {
    return({
        type: HIDE_RECORD_ERROR
    })
}

export const filterWeightDataAction = (startDate, endDate) => {
    return({
        type: FILTER_WEIGHT_DATA,
        startDate,
        endDate,
    })
}

export const logIn = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST + SENT,
        });
        if(validatePassword(password) && validateEmail(email)) {
            fetch(`http://localhost:8000/api/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({email: email, password: md5(password)})
            })
                .then(response => response.json())
                .then(response => {
                    if (response.body) {
                        dispatch({
                            type: LOGIN_REQUEST + SUCCESS,
                            payload: response.body
                        })
                    } else dispatch({
                        type: LOGIN_REQUEST + FAILURE,
                        payload: response.error
                    })
                })
                .catch(error => dispatch({
                    type: LOGIN_REQUEST + FAILURE,
                    payload: error
                }))
        }else{
            dispatch({
                type: LOGIN_REQUEST + FAILURE,
                payload: "email must be valid and password length must be more than 4 symbols"
            })
        }
    }
}

export const signUp = (email, password) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST + SENT,
        });
        if(validatePassword(password) && validateEmail(email)) {
            fetch(`http://localhost:8000/api/register`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({email: email, password: md5(password)})
            })
                .then(response => response.json())
                .then(response => {
                    if (response.body) {
                        dispatch({
                            type: REGISTER_REQUEST + SUCCESS,
                            payload: response.body
                        })
                    } else dispatch({
                        type: REGISTER_REQUEST + FAILURE,
                        payload: response.error
                    })
                })
                .catch(error => dispatch({
                    type: REGISTER_REQUEST + FAILURE,
                    payload: error
                }))
        }else{
            dispatch({
                type: REGISTER_REQUEST + FAILURE,
                payload: "Email must be valid and password length must be more than 4 symbols"
            })
        }
    }
}

export const getProfileInfo = (authToken) => {
    return (dispatch) => {
        dispatch({
            type: GET_PROFILE_INFO + SENT,
        })
        fetch(`http://localhost:8000/api/getProfileInfo?authToken=${authToken}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(response => {
                if(response.body){
                    dispatch({
                        type: GET_PROFILE_INFO + SUCCESS,
                        payload: response.body
                    })
                }else{
                    dispatch({
                        type: GET_PROFILE_INFO + FAILURE,
                        payload: response.error
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: GET_PROFILE_INFO + FAILURE,
                    payload: error
                })
            })
    }
}

export const addWeightRecord = (date, weight, authToken) => {
    return (dispatch) => {
        dispatch({
            type: ADD_WEIGHT_RECORD + SENT,
        })
        fetch(`http://localhost:8000/api/makeWeightRecord?authToken=${authToken}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({date: date, weight: weight})
        })
            .then(response => response.json())
            .then(response => {
                if(response.body){
                    dispatch({
                        type: ADD_WEIGHT_RECORD + SUCCESS,
                        payload: response.body
                    })
                }else{
                    dispatch({
                        type: ADD_WEIGHT_RECORD + FAILURE,
                        payload: response.error
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: ADD_WEIGHT_RECORD + FAILURE,
                    payload: error
                })
            })
    }
}