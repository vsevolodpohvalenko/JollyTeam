import React from 'react'
import {ResetPasswordConfirm } from './ResetPasswordConfirm'
import {connect} from 'react-redux'
import {compose} from 'redux'
import { withRouter, Redirect } from 'react-router-dom';




class ResetPasswordConfirmContainer extends React.Component {
    render () {
        return (<div><ResetPasswordConfirm uid = {this.props.match.params.uid} token = {this.props.match.params.token}/></div>)
    }
}

const mapStateToProps = (state) => ({
})

export default compose(withRouter, connect(mapStateToProps, {}))(ResetPasswordConfirmContainer)