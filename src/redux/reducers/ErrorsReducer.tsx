export const GET_ERRORS = "GET_ERRORS"

export interface GetError {
    type: typeof GET_ERRORS,
    payload: {
        msg:string,
        status: number
    }
}

const initialState = {
    msg: {},
    status: null
};


export const ErrorsReducer = (state = initialState, action: GetError) => {
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

export const returnErrors = (msg: string, status: number) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status},
    };
};