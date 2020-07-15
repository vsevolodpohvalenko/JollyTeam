import { contentAPI } from "../../api";

const GET_CONTENT = 'GET-CONTENT'

const initialState = {
    content: []
};

export const ContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTENT:
            debugger
            return {...state, content: action.payload}
        default:
            return state;
    }
}

const getContentSuccessful = (content) => ({type: GET_CONTENT, payload: content})


export const getContent = () => async (dispatch) => {
    
    const response = await contentAPI.content()
    dispatch(getContentSuccessful(response.data))
}