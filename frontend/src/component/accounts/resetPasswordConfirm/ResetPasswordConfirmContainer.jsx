import React from 'react'
import {ResetPasswordConfirm } from './ResetPasswordConfirm'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { withRouter, Redirect } from 'react-router-dom';




class ResetPasswordConfirmContainer extends React.PureComponent {
    render () {
        return (<div><ResetPasswordConfirm /></div>)
    }
}

const mapStateToProps = (state) => ({
})

export default compose(withRouter, connect(mapStateToProps, {}))(ResetPasswordConfirmContainer)