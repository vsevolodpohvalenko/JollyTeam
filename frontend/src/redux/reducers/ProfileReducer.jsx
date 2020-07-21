import { profileAPI } from "../../api"
const GET_COUNTRIES = "GET_COUNTRIES"
const GET_PROFILES = "GET-PROFILES"
let initialState = {
    profiles: [],
    countries: []
};

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_COUNTRIES:
            return{...state, countries: action.payload}
        case GET_PROFILES:
            return {...state, profiles:  action.payload}
        default: 
            return state 
         }
    }

const getCountriesSuccessful = (payload) => ({type: GET_COUNTRIES, payload})
const getProfilesSuccessful = (payload) => ({type: GET_PROFILES, payload})

export const GetCountries = () => async(dispatch) => {
    const response = await profileAPI.getCountries()
    dispatch(getCountriesSuccessful(response.data))
}

export const GetProfiles = () => async(dispatch) => {
    const response = await profileAPI.getProfile()
    dispatch(getProfilesSuccessful(response.data))
}