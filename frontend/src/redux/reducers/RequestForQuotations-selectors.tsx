import {AppStateType} from "../redux_store";

export const GetPaymentMethodsS = (state: AppStateType) => {
    return state.profile.paymentMethods
}

export const GetCurrencySelector = (state: AppStateType) => {
    return state.profile.countries
}

export const GetCategorySelector = (state: AppStateType) => {
    return state.profile.category
}
