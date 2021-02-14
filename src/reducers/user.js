import {Record} from "immutable";
import {
    ADD_WEIGHT_RECORD,
    FAILURE,
    FILTER_WEIGHT_DATA,
    GET_PROFILE_INFO, HIDE_RECORD_ERROR,
    LOG_OUT,
    LOGIN_REQUEST,
    REGISTER_REQUEST,
    SENT,
    SUCCESS
} from "../constants";
import {filterWeightData} from "../helpers";

const userDataInitial = {
    authToken: localStorage.getItem('authToken'),
    loading: false,
    loaded: false,
    error: false,
    weightData: null,
    filteredWeightData: null,
}

const UserState = Record({
    loading: false,
    userData: userDataInitial,
    newWeightRecord: {
        error: null,
        loading: false,
    },
    error: null,
});

const defaultState = UserState();

export default (userState = defaultState, action) => {
    const {type, payload} = action;

    switch (type) {
        case LOGIN_REQUEST + SENT: {
            return userState.set("loading", true)
                .set("error", null)
        }
        case LOGIN_REQUEST + SUCCESS: {
            localStorage.setItem('authToken', payload.authToken)
            return userState.set("loading", false)
                .setIn(["userData", "authToken"], payload.authToken)
                .setIn(["userData", "weightData"], payload.weightData)
                .setIn(["userData", "filteredWeightData"], payload.weightData)
                .setIn(["userData", "loaded"], true)
                .setIn(["userData", "error"], null)
        }
        case LOGIN_REQUEST + FAILURE: {
            return userState.set("loading", false)
                .set("error", payload)
        }
        case REGISTER_REQUEST + SENT: {
            return userState.set("loading", true)
                .set("error", null)
        }
        case REGISTER_REQUEST + SUCCESS: {
            localStorage.setItem('authToken', payload.authToken)
            return userState.set("loading", false)
                .setIn(["userData", "authToken"], payload.authToken)
                .setIn(["userData", "loaded"], true)
                .setIn(["userData", "error"], null)
        }
        case REGISTER_REQUEST + FAILURE: {
            return userState.set("loading", false)
                .set("error", payload)
        }
        case GET_PROFILE_INFO + SENT: {
            return userState.setIn(["userData", "loading"], true)
        }
        case GET_PROFILE_INFO + SUCCESS: {
            return userState.setIn(["userData", 'weightData'], payload.weightData)
                .setIn(["userData", "filteredWeightData"], payload.weightData)
                .setIn(["userData", "loading"], false)
                .setIn(["userData", "loaded"], true)
        }
        case GET_PROFILE_INFO + FAILURE: {
            return userState.set("loading", false)
                .setIn(["userData", "error"], payload)
                .setIn(["userData", "loaded"], true)
        }
        case ADD_WEIGHT_RECORD + SENT: {
            return userState.setIn(["newWeightRecord", 'loading'], true)
                .set("error", null)
        }
        case ADD_WEIGHT_RECORD + SUCCESS: {
            return userState.setIn(["newWeightRecord", 'loading'], false)
                .setIn(["userData", "weightData"], payload.weightData)
                .setIn(["userData", "filteredWeightData"], payload.weightData)
        }
        case ADD_WEIGHT_RECORD + FAILURE: {
            return userState.setIn(["newWeightRecord", 'loading'], false)
                .setIn(["newWeightRecord", "error"], payload)
        }
        case LOG_OUT: {
            localStorage.setItem('authToken', '')
            return userState.set('userData', {
                authToken: null,
                loading: false,
                loaded: false,
                error: false
            })
        }
        case FILTER_WEIGHT_DATA: {
            return userState
                .setIn(
                    ['userData', 'filteredWeightData'],
                    filterWeightData(action.startDate, action.endDate, userState.userData.weightData)
                )
        }
        case HIDE_RECORD_ERROR: {
            return userState.setIn(['newWeightRecord', 'error'], null)
        }
    }
    
    return userState
}