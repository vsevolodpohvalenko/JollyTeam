import {AppStateType} from "../redux_store";

export const GetSuitableProfile = (state: AppStateType) => {
    return state.profile.profiles
}

export const GetDocumentsSelector = (state: AppStateType) => {
    return state.profile.documents
}

export const GetUserIDSelector = (state: AppStateType) => {
    return state.auth.user.id
}

export const GetCountriesSelector = (state: AppStateType) => {
    return state.profile.countries
}

export const GetCategorySelector = (state: AppStateType) => {
    return state.profile.category
}