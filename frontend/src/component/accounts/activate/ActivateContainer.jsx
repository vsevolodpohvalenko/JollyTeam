import React from 'react'
import {connect} from 'react-redux'
import { Activate } from './Activate'
import { authAPI } from '../../../api'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {login} from '../../../redux/reducers/AuthReducer'



class ActivateContainer extends React.PureComponent {
    componentDidMount(){
        debugger
        const body = {
            uid:this.props.match.params.uid,
            token: this.props.match.params.token}
        authAPI.activate(body)
        this.props.login(localStorage.getItem('email'), localStorage.getItem('password'))
    }
    render () {
        return (<div><Activate  /></div>)
    }
}

const mapStateToProps = (state) => ({
})

export default compose( withRouter,connect(mapStateToProps, {login}))(ActivateContainer)