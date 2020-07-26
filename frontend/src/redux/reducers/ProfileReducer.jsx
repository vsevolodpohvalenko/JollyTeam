import { profileAPI } from "../../api"
const GET_COUNTRIES = "GET_COUNTRIES"
const GET_PROFILES = "GET-PROFILES"
const GET_DOCUMENTS = "GET-DOCUMENTS"
const GET_CATEGORY = "GET-CATEGORY"
const GET_SEARCHED_PROFILES = "GET_SEARCHED_PROFILES"



let initialState = {
    profiles: [],
    countries: [],
    documents: [],
    category: []
};

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_COUNTRIES:
            return{...state, countries: action.payload}
        case GET_PROFILES:
            return {...state, profiles:  action.payload}
        case GET_DOCUMENTS:
            return {...state, documents:  action.payload}
        case GET_CATEGORY:
            return {...state, category: action.payload}
        case GET_SEARCHED_PROFILES:
            return {...state, profiles:  action.payload}
        default: 
            return state 
         }
    }

const getCountriesSuccessful = (payload) => ({type: GET_COUNTRIES, payload})
const getProfilesSuccessful = (payload) => ({type: GET_PROFILES, payload})
const getDocumentsSuccessful = (payload) => ({type: GET_DOCUMENTS, payload})
const getCategorySuccessful = (payload) => ({type: GET_CATEGORY, payload})
const getSearchedProfiles = (payload) => ({type: GET_SEARCHED_PROFILES, payload})

export const GetCountries = () => async(dispatch) => {
    const response = await profileAPI.getCountries()
    dispatch(getCountriesSuccessful(response.data))
}

export const GetProfiles = () => async(dispatch) => {
    const response = await profileAPI.getProfile()
    dispatch(getProfilesSuccessful(response.data))
}

export const GetDocuments = () => async(dispatch) => {
    const response = await profileAPI.getDocuments()
    dispatch(getDocumentsSuccessful(response.data))
}

export const GetCategory = () => async(dispatch) => {
    const response = await profileAPI.getCategory()
    dispatch(getCategorySuccessful(response.data))
}

export const GetSearchedData = (search) => async(dispatch) => {
    debugger
    const response = await profileAPI.getSearcheddData(search)
    dispatch(getSearchedProfiles(response.data))
}