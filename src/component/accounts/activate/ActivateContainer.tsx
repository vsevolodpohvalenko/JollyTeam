import React from 'react'
import {connect} from 'react-redux'
import { Activate } from './Activate'

import {RouteComponentProps, withRouter} from 'react-router-dom';
import { compose } from 'redux';
import {login, ActivateUser} from '../../../redux/reducers/AuthReducer'
import {AppStateType} from "../../../redux/redux_store";
import {getCookie} from "../Register/register";

type RootPropsType = {
    ActivateUser: (body: {uid: string|number, token: number|string}, csrftoken: string| null) => void
}

class ActivateContainer extends React.PureComponent<RootPropsType & RouteComponentProps> {
    csrftoken = getCookie('csrftoken');
    componentDidMount(){
        debugger
        const body = {
            uid:(this.props.match as any).params.uid,
            token: (this.props.match as any).params.token}
        this.props.ActivateUser(body, this.csrftoken)

    }
    render () {
        return (<div><Activate  /></div>)
    }
}

const mapStateToProps = (state:AppStateType) => ({
    indicate: state.auth.activated
})

export default compose( withRouter,connect(mapStateToProps, {login, ActivateUser}))(ActivateContainer)