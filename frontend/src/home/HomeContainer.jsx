import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../redux/reducers/AuthReducer'
import { Home } from './Home'
 

class HomeContainer extends React.Component {
    render() {
        return(
            <Home logout = {this.props.logout} isAuthenticated = {this.props.auth.isAuthenticated} user = {this.props.auth.user}/>
        )
    }
}
let mapStateToProps = (state) =>{
    return {auth: state.auth}
   }
export default connect(mapStateToProps, {logout})(HomeContainer)