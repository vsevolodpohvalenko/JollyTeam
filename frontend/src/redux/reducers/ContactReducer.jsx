import { contentAPI } from "../../api";

const GET_CONTACT = 'GET-CONTACT'

const initialState = {
    contact: []
};

export const ContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTACT:
            debugger
            return {...state, contact: action.payload}
        default:
            return state;
    }
}

const getContactSuccessful = (content) => ({type: GET_CONTENT, payload: content})


export const getContact = () => async (dispatch) => {
    
    const response = await contentAPI.GetContact()
    dispatch(getContactSuccessful(response.data))
}