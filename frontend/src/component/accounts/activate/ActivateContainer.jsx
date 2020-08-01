import React from 'react'
import {connect} from 'react-redux'
import { Activate } from './Activate'

import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {login, ActivateUser} from '../../../redux/reducers/AuthReducer'



class ActivateContainer extends React.PureComponent {
    componentDidMount(){
        debugger
        const body = {
            uid:this.props.match.params.uid,
            token: this.props.match.params.token}
        this.props.ActivateUser(body)

    }
    render () {
        return (<div><Activate  /></div>)
    }
}

const mapStateToProps = (state) => ({
    indicate: state.auth.activated
})

export default compose( withRouter,connect(mapStateToProps, {login, ActivateUser}))(ActivateContainer)