import React from 'react'
import { ResetPassword } from './ResetPassword'
import {connect} from 'react-redux'





class ResetPasswordContainer extends React.PureComponent {
    render () {
        return (<div><ResetPassword  /></div>)
    }
}

const mapStateToProps = (state) => ({
    email: state.auth.email
})

export default connect(mapStateToProps)(ResetPasswordContainer)