export const CREATE_MESSAGE = "CREATE_MESSAGE"

const initialState = {};

export const MessagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload);
        default:
            return state;
    }
}

export const createMessage = (msg) => {
    return {
        type: CREATE_MESSAGE,
        payload: msg,
    };
};

