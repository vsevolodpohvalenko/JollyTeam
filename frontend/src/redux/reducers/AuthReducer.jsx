import {GET_ERRORS} from './ErrorsReducer'
import {createMessage} from './MessageReducer'
import {authAPI} from "../../api"

const USER_LOADING = 'USER_LOADING'
const USER_LOADED = 'USER_LOADED'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'


let initialState = {
    auth_token: localStorage.getItem('auth_token'),
    isAuthenticated: null,
    isLoading: false,
    user: localStorage.getItem('user'),

}

export const AuthReducer = (state = initialState, action) => {

    switch (action.type) {
        case USER_LOADING :
            return {...state, isLoading: true}
        case USER_LOADED:
            localStorage.setItem('user', action.payload)
            return {...state, isAuthenticated: true, isLoading: false, user: action.payload}
        case LOGIN_SUCCESS:
            localStorage.setItem('auth_token', action.payload.auth_token)
            return {
                ...state, ...action.payload, isAuthenticated: true, isLoading: false
            }
        case REGISTER_SUCCESS:
            
            return {...state, auth_token:null, user:action.payload}
        case LOGOUT_SUCCESS:
            debugger
            localStorage.removeItem('auth_token');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {...state, auth_token: null, user: null, isAuthenticated: false, isLoading: false}
        default:
            return state
    }
}

const loadUserSuccess = () => ({type: USER_LOADING})
const loginSuccess = (payload) => ({type: LOGIN_SUCCESS, payload})
const getUserSuccess = (payload) => ({type: USER_LOADED, payload})
const logoutSuccess = () => ({type: LOGOUT_SUCCESS})
const registerSuccess = (user) => ({type: REGISTER_SUCCESS, payload: user})



export const loadUser = () => async (dispatch, getState) => {
    debugger
    dispatch(loadUserSuccess());

    const response = await authAPI.getUser(tokenConfig(getState))
    dispatch(getUserSuccess(response.data));
}

export const Logout = () =>  (dispatch, getState) => {
    
    authAPI.logout(tokenConfig(getState)).then(res =>console.log(res.status) ,dispatch(logoutSuccess()))
    }


export const login = (email, password) => async (dispatch, getState) => {
debugger
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
        const res = await authAPI.getUser(tokenConfig(getState))
        dispatch(getUserSuccess(res.data));
        
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

export const register = ({email, first_name, last_name, password}) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({first_name, last_name, password, email})
    try {
        const response = await authAPI.register(body, config)
        dispatch(registerSuccess(response.data))
        dispatch(
            createMessage({registred: "Check your email!"}))
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
    debugger
    const auth_token = getState().auth.auth_token;

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (auth_token) {
        config.headers['Authorization'] = `Token ${auth_token}`;
    }


    return config
}