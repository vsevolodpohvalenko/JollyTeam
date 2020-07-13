import React from 'react'
import {connect} from 'react-redux'
import { Activate } from './Activate'
import { authAPI } from '../../../api'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';




class ActivateContainer extends React.Component {
    componentDidMount(){
        debugger
        const body = {
            uid:this.props.match.params.uid,
            token: this.props.match.params.token}
        authAPI.activate(body)
    }
    render () {
        return (<div><Activate  /></div>)
    }
}

const mapStateToProps = (state) => ({
    
})

export default compose( withRouter,connect(mapStateToProps, {}))(ActivateContainer)