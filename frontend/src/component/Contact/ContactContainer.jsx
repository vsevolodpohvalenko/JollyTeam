import React from 'react'
import {connect} from 'react-redux'
import { Contact } from './Contact'
class ContactContainer extends React.PureComponent {
    render() {
        debugger
        return(
            <div><Contact userID = {this.props.userID}/></div>
        )
    }
}
let mapStateToProps = (state) =>{
    return {
        userID: String(state.auth.user.id)
    }
   }
export default connect(mapStateToProps, {})(ContactContainer)