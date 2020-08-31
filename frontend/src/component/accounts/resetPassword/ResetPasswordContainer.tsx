import React from 'react'
import { ResetPassword } from './ResetPassword'
import {connect, ConnectedProps} from 'react-redux'
import {AppStateType} from "../../../redux/redux_store";





class ResetPasswordContainer extends React.PureComponent<PropsReduxType> {
    render () {
        return (<div><ResetPassword  /></div>)
    }
}

const mapStateToProps = (state: AppStateType) => ({
    email: state.auth.user.email
})

const connector = connect(mapStateToProps, {})

type PropsReduxType = ConnectedProps<typeof connector>

export default (ResetPasswordContainer)