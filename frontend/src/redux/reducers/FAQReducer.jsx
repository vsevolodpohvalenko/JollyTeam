import {faqAPI} from "../../api"

const ACTIVE_ITEM = "ACTIVE_ITEM"
const GET_FAQ_GROUPS = "GET-FAQ-GROUPS"
const GET_FAQ_ITEM = "GET-FAQ-ITEM"
const MAKE_ACTIVE = "MAKE_ACTIVE"

let initialState = {
    groups: [],
    items: [],
    active_item: null
}

export const FAQReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FAQ_GROUPS:
            return {...state, groups: action.payload}
        case ACTIVE_ITEM:
            return {...state, active_item: action.payload}
        case GET_FAQ_ITEM:
            return {...state, items: action.payload}
        case MAKE_ACTIVE:
            return {...state, active_item: {...state.active_item, Active: !state.active_item.Active}}
        default:
            return state
    }
}

const getFaqGroupsSuccess = (payload) => ({type: GET_FAQ_GROUPS, payload})
const getFaqItemsSuccess = (payload) => ({type: GET_FAQ_ITEM, payload})
const activeIdSuccess = (item) => ({type: ACTIVE_ITEM, payload: item})

export const getFaqGroups = () => async dispatch => {
    let response = await faqAPI.getFaq_Group()
    dispatch(getFaqGroupsSuccess(response.data))
}
export const ActiveId = (item) => async dispatch => {
    debugger
    dispatch(activeIdSuccess(item))
    dispatch({type: MAKE_ACTIVE})
}

export const getFaqItems = () => async dispatch => {
    let response = await faqAPI.getFaq_Item()
    dispatch(getFaqItemsSuccess(response.data))
}
