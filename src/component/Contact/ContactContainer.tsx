import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import { Contact } from './Contact'
import {AppStateType} from "../../redux/redux_store";

class ContactContainer extends React.PureComponent<PropsFromRedux> {
    render() {
        debugger
        return(
            <div><Contact userID = {this.props.userID}/></div>
        )
    }
}
let mapStateToProps = (state: AppStateType) =>{
    return {
        userID: String(state.auth.user.id)
    }
   }


const connector = connect(mapStateToProps, {})
type PropsFromRedux = ConnectedProps<typeof connector>
export default connector(ContactContainer)