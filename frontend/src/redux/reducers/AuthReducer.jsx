import {GET_ERRORS} from './ErrorsReducer'
import {createMessage} from './MessageReducer'
import {authAPI} from "../../api"

const USER_LOADING = 'USER_LOADING'
const USER_LOADED = 'USER_LOADED'
const AUTH_ERROR = 'AUTH_ERROR'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const REGISTER_FAIL = 'REGISTER_FAIL'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const FORGOT = 'FORGOT'
const RESET_CODE = 'RESET_CODE'


let initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,

}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING :
            return {...state, isLoading: true}
        case USER_LOADED:
            return {...state, isAuthenticated: true, isLoading: false, user: action.payload}
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {...state, user: null, token: null, isAuthenticated: false, isLoading: false}
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            debugger
            localStorage.setItem('token', action.payload.auth_token)
            return {
                ...state, ...action.payload, isAuthenticated: true, isLoading: false
            }
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {...state, token: null, user: null, isAuthenticated: false, isLoading: false}
        case FORGOT:
            return {...state, forgot: true}
        case RESET_CODE:
            return {...state, code: action.payload}
        default:
            return state
    }
}

const loadUserSuccess = () => ({type: USER_LOADING})
const loginSuccess = (payload) => ({type: LOGIN_SUCCESS, payload})
const getUserSuccess = (payload) => ({type: USER_LOADED, payload})
const logoutSuccess = () => ({type: LOGOUT_SUCCESS})
const forgotSuccess = () => ({type: FORGOT})

export const loadUser = () => async (dispatch, getState) => {
    dispatch(loadUserSuccess());

    const response = await authAPI.getUser(tokenConfig(getState))
    dispatch(getUserSuccess(response.data));
}

export const logout = () => async (dispatch, getState) => {

    await authAPI.logout(tokenConfig(getState))
    dispatch(logoutSuccess);
}

export const login = (email, password) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json',

        }
    }

    const body = JSON.stringify({email, password})
    try {
        let response = await authAPI.login(body, config)
        dispatch(loginSuccess(response.data))
        dispatch(createMessage({logined: "Loggined successful"}))
    } catch (err) {
        const errors = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })


    }
}
export const forgotpassword = (body) => async dispatch => {

    await authAPI.forgot_password(body)
    dispatch(forgotSuccess())
}

export const register = ({email, first_name, last_name, password}) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({first_name, last_name, password, email})
    try {
        const response = await authAPI.register(body, config)
        dispatch(loginSuccess(response.data))
        dispatch(
            createMessage({registred: "registred successful"}))
    } catch (err) {
        const error = {
            msg: err.response.data,
            status: err.response.status
        }
        dispatch({
            payload: error,
            type: GET_ERRORS
        })

    }
}


export const tokenConfig = getState => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }


    return config
}