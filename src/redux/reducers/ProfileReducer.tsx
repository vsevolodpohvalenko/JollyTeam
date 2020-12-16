import {CREATE_MESSAGE} from "./MessageReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "../redux_store";
import {Dispatch} from "redux";
import {profileAPI} from "../../api/profileApi";

const GET_COUNTRIES = "GET_COUNTRIES"
const GET_PROFILES = "GET-PROFILES"
const GET_DOCUMENTS = "GET-DOCUMENTS"
const GET_CATEGORY = "GET-CATEGORY"
const GET_SEARCHED_PROFILES = "GET_SEARCHED_PROFILES"
const GET_PAYMENT_METHODS = 'GET_PAYMENT_METHODS'

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes>

export type initialStateType = {
    paymentMethods: Array<{ id: number, method: string }>,
    profiles: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }> | any,
    countries: any,
    documents: Array<{
        id: number,
        Title: string,
        Thumbnail: string,
        Download: string,
        owner: number
    }> | any,
    category: any
}

export let initialState: initialStateType = {
    profiles: [{id: 0}],
    countries: [],
    documents: [],
    category: [],
    paymentMethods: [],
};

export const ProfileReducer = (state = initialState, action: ProfileActionTypes) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {...state, countries: action.payload}
        case GET_PROFILES:
            return {...state, profiles: action.payload}
        case GET_DOCUMENTS:
            return {...state, documents: action.payload}
        case GET_CATEGORY:
            return {...state, category: action.payload}
        case GET_SEARCHED_PROFILES:
            return {...state, profiles: action.payload}
        case GET_PAYMENT_METHODS:
            return {...state, paymentMethods: action.payload}
        default:
            return state
    }
}
export type ProfileActionTypes = InferActionsTypes<typeof actions>
export const actions: { [key: string]: (...args: any) => any; } = {
    getCountriesSuccessful: (payload: any): ProfileActionTypes => ({type: GET_COUNTRIES, payload}),
    getProfilesSuccessful: (payload: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }>): ProfileActionTypes => ({type: GET_PROFILES, payload}),
    getDocumentsSuccessful: (payload: Array<{
        id: number,
        Title: any,
        Thumbnail: any,
        Download: any,
        owner: number
    }>): ProfileActionTypes => ({type: GET_DOCUMENTS, payload}),
    getCategorySuccessful: (payload: Array<{
        id: number,
        Name: string
    }>): ProfileActionTypes => ({type: GET_CATEGORY, payload}),
    getSearchedProfiles: (payload: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }>): ProfileActionTypes => ({type: GET_SEARCHED_PROFILES, payload}),
    getPaymentMethodsSuccessful: (payload: any) => ({type: GET_PAYMENT_METHODS, payload})
}

export const GetCountries = (): ThunkType => async (dispatch) => {
    const response = await profileAPI.getCountries()
    dispatch(actions.getCountriesSuccessful(response.data))
}

export const GetProfiles = (): ThunkType => async (dispatch) => {
    const response = await profileAPI.getProfile()
    dispatch(actions.getProfilesSuccessful(response.data))
}
export const GetPaymentMethods = (): ThunkType => async (dispatch) => {
    const response = await profileAPI.getPaymentMethods()
    dispatch(actions.getPaymentMethodsSuccessful(response.data))
}
export const updateManufacturer = (data: any, id: number) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    await profileAPI.PutProfile(data, id)
    dispatch(
        {
            type: CREATE_MESSAGE,
            payload: {registered: "Your Profile was Submitted!"}
        })
}
export const updateDocument = (data: any, id: number) => async (dispatch: Dispatch<ProfileActionTypes>) => {
    await profileAPI.PatchDocuments(data, id)
    dispatch({
        type: CREATE_MESSAGE,
        payload: {registered: "Documents for your Profile were Submitted!"}
    })
}
export const postDocument = (id: number): ThunkAction<Promise<void>, AppStateType, unknown, ProfileActionTypes> => async (dispatch) => {
    await profileAPI.PostDocuments(id)
    const response = await profileAPI.getDocuments()
    dispatch(actions.getDocumentsSuccessful(response.data))
    dispatch({
        type: CREATE_MESSAGE,
        payload: {registered: "One more document was added"}
    })

}
export const GetDocuments = (): ThunkType => async (dispatch) => {
    debugger
    const response = await profileAPI.getDocuments()
    dispatch({type: GET_DOCUMENTS, payload: response.data})
}

export const GetCategory = (): ThunkType => async (dispatch) => {
    const response = await profileAPI.getCategory()
    dispatch(actions.getCategorySuccessful(response.data))
}

export const GetSearchedData = (search: string): ThunkType => async (dispatch) => {
    debugger
    const response = await profileAPI.getSearchedData(search)
    dispatch(actions.getSearchedProfiles(response.data))

}