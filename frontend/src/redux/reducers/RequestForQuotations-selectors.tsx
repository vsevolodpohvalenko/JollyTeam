import {AppStateType} from "../redux_store";

export const GetUserIdSelector = (state: AppStateType) => {
    return state.auth.user.id
}

export const GetCurrencySelector = (state: AppStateType) => {
    return state.profile.countries
}

export const GetCategorySelector = (state: AppStateType) => {
    return state.profile.category
}
