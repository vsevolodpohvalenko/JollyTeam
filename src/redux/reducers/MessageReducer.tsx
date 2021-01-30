export const CREATE_MESSAGE = "CREATE_MESSAGE"

export interface CreateMessageAction {
    type: typeof CREATE_MESSAGE,
    payload: any
}
export type MessageActionTypes = CreateMessageAction
const initialState = {};

export const MessagesReducer = (state = initialState, action: CreateMessageAction) => {
    switch (action.type) {
        case CREATE_MESSAGE:
            return (state = action.payload);
        default:
            return state;
    }
}

type createMessageType = {
    log_in_ed: string
} | {registered: string}

export const createMessage = (msg: createMessageType) => {
    debugger
    return {
        type: CREATE_MESSAGE,
        payload: msg,
    };
};
