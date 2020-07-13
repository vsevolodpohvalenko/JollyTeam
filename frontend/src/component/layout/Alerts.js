import React, { Component , Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux'
class Alerts extends Component {

    componentDidUpdate(prevProps){
        const {error, message} = this.props;
        if (error !== prevProps.error){
            if (error.msg.email)
                this.props.alert.error(`Email: ${error.msg.email.join()}`)
            if (error.msg.password)
                this.props.alert.error(`Password: ${error.msg.password.join()}`)
            if (error.msg.non_field_errors)
                this.props.alert.error(`${error.msg.non_field_errors.join()}`)
            if (error.msg.first_name)
                {this.props.alert.error(`First name ${error.msg.first_name.join()}`)}
            if (error.msg.last_name)
                {this.props.alert.error(`Last name ${error.msg.last_name.join()}`)}
            if (error.msg.password1)
                {this.props.alert.error(`Password ${error.msg.password1.join()}`)}}
        if (message !== prevProps.message){
            debugger
            if (message.logined)
                {this.props.alert.success(`${message.logined}`)}
            if (message.registred)
                {this.props.alert.success(`${message.registred}`)}
        }
 
            
        
    }
    render() {
        return <Fragment>

        </Fragment>
    }
}

const mapStateToProps = (state) => {
    debugger
    return{

    error: state.error,
    message: state.message
}}

export default connect(mapStateToProps)(withAlert()(Alerts))