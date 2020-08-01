import React from 'react'
import {MainTemplate} from '../Templates/main_template'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
const PrivateRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest}
    render = {(props) => {
        if (auth.isLoading){
            return <div>...Loading</div>
        }
        else if (!auth.auth_token) {
            return <Redirect to="/login"/>
        }
        else{return (
        <MainTemplate>
        <Component {...props} />
        </MainTemplate>)}
    }}/>
)
        
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)