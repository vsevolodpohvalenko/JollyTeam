import React from 'react';
import './App.css';
import {Provider} from 'react-redux'
import {AccountTemplate} from './component/Templates/account_template/account_template'
import Login from './component/accounts/Login/login'
import store from './redux/redux_store'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from './component/accounts/Register/register';
import PrivateRoute from './component/common/PrivateRoute';
import {loadUser} from './redux/reducers/AuthReducer';
import {positions, Provider as AlertProvider, transitions} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Alerts from './component/layout/Alerts';
import ResetPasswordConfirmContainer from './component/accounts/resetPasswordConfirm/ResetPasswordConfirmContainer';
import ResetPasswordContainer from './component/accounts/resetPassword/ResetPasswordContainer';
import ActivateContainer from './component/accounts/activate/ActivateContainer';
import HomeContainer from './component/home/HomeContainer';
import ContactContainer from './component/Contact/ContactContainer';
import ProfileViewContainer from "./component/accounts/Profile/ProfileView/ProfileViewContainer";
import CompaniesContainer from "./component/Companies/companiesContainer";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
import Preloader from "./component/Preloader/preloader";
import {PageNotFound} from "./component/layout/PageNotFound";
import {FrequentlyAskedQuestions} from "./component/FAQ/FAQ";
import {Profile} from "./component/User/Profile";
import {RequestForProposals} from "./component/requestForProposals/requestForProposals";
import ProfileEditContainer from "./component/accounts/Profile/ProfileEdit/ProfileEditContainer";
import RequestForQuotationContainer from "./component/requestForProposals/requestForProposalsContainer";
import ProfileContainer from "./component/User/ProfileContainer";


const client = new ApolloClient({
    uri: 'https://jollyteam.herokuapp.com/graphql/', // your GraphQL Server
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
                            <Route exact path='/JollyTeam/register'
                                   render={() => <AccountTemplate> <Register/></AccountTemplate>}/>
                            <Route exact path='/JollyTeam/password/reset/confirm/:uid/:token'
                                   render={() => <AccountTemplate><ResetPasswordConfirmContainer/></AccountTemplate>}/>
                            <Route exact path='/JollyTeam/reset_password'
                                   render={() => <AccountTemplate> <ResetPasswordContainer/></AccountTemplate>}/>
                            <Route exact path='/JollyTeam/activate/:uid/:token'
                                   render={() => <AccountTemplate> <ActivateContainer/></AccountTemplate>}/>
                            <Route exact path='/JollyTeam/faq_group'
                                   render={() => <AccountTemplate> <FrequentlyAskedQuestions/></AccountTemplate>}/>
                            <Route exact path='/JollyTeam/login' render={() => <AccountTemplate> <Login/></AccountTemplate>}/>
                            <Route exact path='/JollyTeam/faq' component={FrequentlyAskedQuestions}/>
                            <Route exact path='/JollyTeam/' component={HomeContainer}/>
                            <PrivateRoute exact path='/JollyTeam/contact' component={ContactContainer}/>
                            <PrivateRoute exact path='/JollyTeam/profileEdit' component={ProfileEditContainer}/>
                            <PrivateRoute exact path='/JollyTeam/profileView' component={ProfileViewContainer}/>
                            <Route exact path='/JollyTeam/request_for_proposals' component={RequestForQuotationContainer}/>
                            <Route exact path='/JollyTeam/companies' component={CompaniesContainer}/>
                            <PrivateRoute exact path='/JollyTeam/profile/:id' component={ProfileContainer}/>
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