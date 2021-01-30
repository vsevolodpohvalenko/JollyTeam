import React from 'react'
import {ResetPasswordConfirm } from './ResetPasswordConfirm'
import { withRouter, RouteComponentProps} from 'react-router-dom';


class ResetPasswordConfirmContainer extends React.PureComponent<RouteComponentProps> {
    render () {
        return (<div><ResetPasswordConfirm uid = {(this.props.match as any).params.uid} token={(this.props.match as any).params.token}/></div>)
    }
}
export default (withRouter)(ResetPasswordConfirmContainer)