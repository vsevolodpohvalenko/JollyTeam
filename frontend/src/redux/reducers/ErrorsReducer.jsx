export const GET_ERRORS = "GET_ERRORS"

const initialState = {
    msg: {},
    status: null
};

export const ErrorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            debugger
            return {
                msg: action.payload.msg,
                status: action.payload.status,
            };
        default:
            return state;
    }
}

export const returnErrors = (msg, status) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status},
    };
};