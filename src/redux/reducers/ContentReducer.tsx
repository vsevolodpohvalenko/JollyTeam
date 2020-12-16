import {ContentActionTypes} from "./ContentTypes";
import {contentAPI} from "../../api/ContentApi";

const GET_PAGE = 'GET-PAGE'
const GET_CONTENT = 'GET-CONTENT'

type initialContentType = {
    content: Array<{
        id: number,
        Title: string,
        BrowserTitle: string,
        MetaDescription: string,
        UrlSlug: string,
        Content: string
    }> | null,
    page: Array<string> | any
}


const initialState: initialContentType = {
    content: null,
    page: null
};

export const ContentReducer = (state = initialState, action: ContentActionTypes) => {
    switch (action.type) {
        case GET_CONTENT:
            return {...state, content: action.payload}
        case GET_PAGE:
            debugger
            return {...state, page: action.payload}
        default:
            return state;
    }
}

const getContentSuccessful = (content: Array<{
    id: number,
    Title: string,
    BrowserTitle: string,
    MetaDescription: string,
    UrlSlug: string,
    Content: string
}> | null) => ({type: GET_CONTENT, payload: content})

export const getContent = () => async (dispatch: any) => {

    const response = await contentAPI.content()
    dispatch(getContentSuccessful(response.data))
}

