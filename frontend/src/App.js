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
import HomeContainer from './component/home/HomeContainer';
import {MainTemplate} from './component/Templates/main_template';
import ContactContainer from './component/Contact/ContactContainer';
import ProfileEditContainer from './component/accounts/Profile/ProfileEdit/ProfileEditContainer';
import ProfileViewContainer from "./component/accounts/Profile/ProfileView/ProfileViewContainer";
import RequestForQuotationContainer from "./component/requestForQuotation/requestForQuotationContainer";
import ManufacturersContainer from "./component/Manufacturers/manufacturersContainer";
import ProfileContainer from "./component/User/ProfileContainer";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Preloader from "./component/Preloader/preloader";
import {PageNotFound} from "./component/layout/PageNotFound";
import {FrequentlyAskedQuestions} from "./component/FAQ";

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/', // your GraphQL Server
});


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
     store.getState().auth.auth_token && store.dispatch(loadUser())
    }

    render() {
       return store.getState().auth.isLoading ? <Preloader/> :  <div className="App">
           <ApolloProvider client={client}>
            <BrowserRouter>
                <Provider store={store}>
                    <AlertProvider template={AlertTemplate}{...options}>
                        <Alerts/>
                        <Switch>
                            <Route exact path='/register'
                                   render={() => <AccountTemplate> <Register/></AccountTemplate>}/>
                            <Route exact path='/password/reset/confirm/:uid/:token'
                                   render={() => <AccountTemplate><ResetPasswordConfirmContainer/></AccountTemplate>}/>
                            <Route exact path='/reset_password'
                                   render={() => <AccountTemplate> <ResetPasswordContainer/></AccountTemplate>}/>
                            <Route exact path='/activate/:uid/:token'
                                   render={() => <AccountTemplate> <ActivateContainer/></AccountTemplate>}/>
                            <Route exact path='/faq_group'
                                   render={() => <AccountTemplate> <FrequentlyAskedQuestions/></AccountTemplate>}/>
                            <Route exact path='/login' render={() => <AccountTemplate> <Login/></AccountTemplate>}/>
                            <PrivateRoute exact path='/faq' component={FrequentlyAskedQuestions}/>
                            <Route exact path='/' component={HomeContainer}/>
                            <PrivateRoute exact path='/contact' component={ContactContainer}/>
                            <PrivateRoute exact path='/profileEdit' component={ProfileEditContainer}/>
                            <PrivateRoute exact path='/profileView' component={ProfileViewContainer}/>
                            <PrivateRoute exact path='/request_for_quotation' component={RequestForQuotationContainer}/>
                            <PrivateRoute exact path='/manufacturers' component={ManufacturersContainer}/>
                            <PrivateRoute exact path='/profile/:id' component={ProfileContainer}/>
                            <Route component={() => <PageNotFound/>} />
                        </Switch>
                    </AlertProvider>
                </Provider>
            </BrowserRouter>
           </ApolloProvider>
        </div>
    }
}

export default App;