import React from "react";
import {connect} from "react-redux";
import {ProfileView} from "./ProfileView";
import { GetDocuments, GetProfiles} from '../../../../redux/reducers/ProfileReducer'
class ProfileViewContainer extends React.Component {
    componentDidMount() {
        this.props.GetDocuments()
        this.props.GetProfiles()
    }

    render() {
        return(
            <ProfileView profiles = {this.props.profiles} my_documents= {this.props.my_documents}/>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    return {
        profiles: state.profile.profiles.filter(e => e.owner === state.auth.user.id),
        my_documents: state.profile.documents.filter(e => e.owner === state.auth.user.id)
    }
}

export  default  connect(mapStateToProps, {GetProfiles, GetDocuments})(ProfileViewContainer)