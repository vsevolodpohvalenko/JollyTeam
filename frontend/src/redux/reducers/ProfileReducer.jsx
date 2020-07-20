import { profileAPI } from "../../api"
const GET_COUNTRIES = "GET_COUNTRIES"
let initialState = {
    profiles: [],
    countries: []
};

export const ProfileReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_COUNTRIES:
            return{...state, countries: action.payload}
        default: 
            return state 
         }
    }

const getCountriesSuccessful = (payload) => ({type: GET_COUNTRIES, payload})

export const GetCountries = () => async(dispatch) => {
    const response = await profileAPI.getCountries()
    dispatch(getCountriesSuccessful(response.data))
}