import {AppStateType} from "../redux_store";

<<<<<<< HEAD
export const GetPaymentMethodsS = (state: AppStateType) => {
    return state.profile.paymentMethods
=======
export const GetUserIdSelector = (state: AppStateType) => {
    return state.auth.user.id
>>>>>>> origin/master
}

export const GetCurrencySelector = (state: AppStateType) => {
    return state.profile.countries
}

export const GetCategorySelector = (state: AppStateType) => {
    return state.profile.category
}
