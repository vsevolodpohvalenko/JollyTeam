import {FAQReducer} from './reducers/FAQReducer'
import {AuthReducer} from './reducers/AuthReducer'
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import {MessagesReducer} from './reducers/MessageReducer'
import {ErrorsReducer} from './reducers/ErrorsReducer'

let reducers = combineReducers({
    FAQ: FAQReducer,
    auth: AuthReducer,
    message: MessagesReducer,
    error: ErrorsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.__store__ = store;
export default store