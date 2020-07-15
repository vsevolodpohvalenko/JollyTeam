import React from 'react'
import {connect} from 'react-redux'
import {Logout} from '../../redux/reducers/AuthReducer'
import { Home } from './Home'
 

class HomeContainer extends React.PureComponent {
    render() {
        return(
            <Home Logout = {this.props.Logout} isAuthenticated = {this.props.auth.isAuthenticated} user = {this.props.auth.user}/>
        )
    }
}
let mapStateToProps = (state) =>{
    return {auth: state.auth}
   }
export default connect(mapStateToProps, {Logout})(HomeContainer)