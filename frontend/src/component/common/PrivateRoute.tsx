import React from 'react'
import {MainTemplate} from '../Templates/main_template'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from "../../redux/redux_store";
import Preloader from "../Preloader/preloader";

type ownPropsType = {
    component : any
    isLoading: boolean | null,
    auth_token: string | number | null
}

const PrivateRoute = ({component: Component, isLoading, auth_token, ...rest}: ownPropsType) => (
    <Route {...rest}
    render = {(props) => {
        if (isLoading){
            return <div><Preloader/></div>
        }
        else if (!auth_token) {
            return <Redirect to="/login"/>
        }
        else{return (
        <MainTemplate>
        <Component {...props} />
        </MainTemplate>)}
    }}/>
)
type mapStateToPropsType = {
    auth_token: number | string | null,
    isLoading: boolean | null
}
type mapDispatchToPropsType = {

}
const mapStateToProps = (state: AppStateType) => ({
    auth_token: state.auth.auth_token,
    isLoading: state.auth.isLoading
})

export default connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, AppStateType>(mapStateToProps, {})(PrivateRoute)