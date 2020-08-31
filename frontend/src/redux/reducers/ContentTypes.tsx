const GET_PAGE = 'GET-PAGE'
const GET_CONTENT = 'GET-CONTENT'

interface GetPage {
    type: typeof GET_PAGE,
    payload: string[]
}
interface GetContent {
    type: typeof GET_CONTENT,
    payload: Array<{
        id: number,
        Title: string,
        BrowserTitle: string,
        MetaDescription: string,
        UrlSlug: string,
        Content: string

    }>

}
export type ContentActionTypes = GetContent | GetPage
