import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../../redux/reducers/AuthReducer'
import { Header } from './Header'
 

class HeaderContainer extends React.Component {
    render() {
        return(
            <Header logout = {this.props.logout} isAuthenticated = {this.props.auth.isAuthenticated} user = {this.props.auth.user}/>
        )
    }
}
let mapStateToProps = (state) =>{
    return {auth: state.auth}
   }
export default connect(mapStateToProps, {logout})(HeaderContainer)