import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import {AccountTemplate} from './component/Templates/account_template/account_template'
import Login from './component/accounts/Login/login'
import store from './redux/redux_store'
import FAQ_Group from './component/FAQ/FAQ_Group';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from './component/accounts/Register/register';
import PrivateRoute from './component/common/PrivateRoute';
import {loadUser} from './redux/reducers/AuthReducer';
import {transitions, positions, Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './component/layout/Alerts';
import ResetPasswordConfirmContainer from './component/accounts/resetPasswordConfirm/ResetPasswordConfirmContainer';
import ResetPasswordContainer from './component/accounts/resetPassword/ResetPasswordContainer';
import ActivateContainer from './component/accounts/activate/ActivateContainer';
import HomeContainer from './home/HomeContainer';


const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_RIGHT,
    timeout: 3000,
    // you can also just use 'scale'
    transition: transitions.SCALE
}

class App extends React.Component {
    componentDidMount() {
        debugger
       store.dispatch(loadUser())
    }

    render() {return <div className="App">
            <BrowserRouter>
                <Provider store={store}>
                    <AlertProvider template={AlertTemplate}{...options}>
                        <Alerts/>
                        <Switch >
                        <Route exact path='/register' render={() => <AccountTemplate> <Register/></AccountTemplate>}/>
                                <Route exact path='/password/reset/confirm/:uid/:token' render={() => <AccountTemplate><ResetPasswordConfirmContainer/></AccountTemplate>}/>
                                <Route exact path='/reset_password' render={() => <AccountTemplate> <ResetPasswordContainer/></AccountTemplate>}/>
                                <Route exact path='/activate/:uid/:token' render={() => <AccountTemplate> <ActivateContainer/></AccountTemplate>}/>
                                <Route exact path='/login' render={() => <AccountTemplate> <Login/></AccountTemplate>}/>
                                <PrivateRoute exact path='/faq' component={FAQ_Group}/>
                                <Route exact path='/' component={HomeContainer}/>
                        </Switch>
                        </AlertProvider>
                        </Provider>
                        </BrowserRouter>
                        </div>}
                                }
export default App;