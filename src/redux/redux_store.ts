import {FAQReducer} from './reducers/FAQReducer'
import {AuthReducer} from './reducers/AuthReducer'
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import {MessagesReducer} from './reducers/MessageReducer'
import {ErrorsReducer} from './reducers/ErrorsReducer'
import {ContentReducer} from './reducers/ContentReducer'
import {ProfileReducer} from './reducers/ProfileReducer'

let rootReducers = combineReducers({
    FAQ: FAQReducer,
    auth: AuthReducer,
    message: MessagesReducer,
    error: ErrorsReducer,
    content: ContentReducer,
    profile: ProfileReducer
})

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsTypes<T extends {[key: string]: (...args: any) => any}> = ReturnType<PropertiesTypes<T>>
 type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

// @ts-ignore
window.__store__ = store;
export default store