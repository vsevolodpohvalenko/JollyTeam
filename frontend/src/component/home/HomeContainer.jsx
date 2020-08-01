import React from 'react'
import {connect} from 'react-redux'
import {Logout} from '../../redux/reducers/AuthReducer'
import { Home } from './Home'
import {GetSearchedData} from "../../redux/reducers/ProfileReducer";
import {Redirect} from "react-router";

class HomeContainer extends React.PureComponent {
    render() {
debugger
        return this.props.profiles.length !== 0 ? <Redirect to={"/manufacturers"}/> : (
            <Home logout = {this.props.Logout}  GetSearchedData = {this.props.GetSearchedData} isAuthenticated = {this.props.auth.isAuthenticated} user = {this.props.auth.user}/>
        )
    }
}
let mapStateToProps = (state) =>{
    return {
        auth: state.auth,
        profiles: state.profile.profiles,
    }
   }
export default connect(mapStateToProps, {Logout, GetSearchedData})(HomeContainer)