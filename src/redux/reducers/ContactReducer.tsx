import {ContactActionTypes} from "./ContactTypes";
import {AppStateType} from "../redux_store";
import {ThunkAction} from "redux-thunk";
import {contactAPI} from "../../api/ContactApi";

const GET_CONTACT = 'GET-CONTACT'


const initialState = {
    contact: []
};

export const ContentReducer = (state = initialState, action: ContactActionTypes) => {
    switch (action.type) {
        case GET_CONTACT:
            debugger
            return {...state, contact: action.payload}
        default:
            return state;
    }
}

const getContactSuccessful = (content: {
    id: number,
    name: string,
    companyName: string,
    emailAddress: string,
    phoneNumber: string,
    subject: string,
    message: string,
    owner: 1
}[]): ContactActionTypes => ({type: GET_CONTACT, payload: content})

export const getContact = (): ThunkAction<Promise<void>, AppStateType, unknown, ContactActionTypes> => async (dispatch) => {

    const response = await contactAPI.GetContact()
    dispatch(getContactSuccessful(response.data))
}