import { contentAPI, findPageAPI } from "../../api";
const GET_PAGE = 'GET-PAGE'
const GET_CONTENT = 'GET-CONTENT'

const initialState = {
    content: [],
    page: []
};

export const ContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTENT:
            return {...state, content: action.payload}
        case GET_PAGE:
            debugger
            return  {...state, page: action.payload}
        default:
            return state;
    }
}

const getContentSuccessful = (content) => ({type: GET_CONTENT, payload: content})
const getPageSuccessful = (page) => ({type: GET_PAGE, payload: page})


export const getContent = () => async (dispatch) => {
    
    const response = await contentAPI.content()
    dispatch(getContentSuccessful(response.data))
}

export const getPage = (search) => async (dispatch) => {
    debugger
    const response = await findPageAPI.findPage(search)
    dispatch(getPageSuccessful(response.data))

}