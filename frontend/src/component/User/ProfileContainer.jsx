import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {compose} from 'redux'
import { GetDocuments, GetProfiles} from '../../redux/reducers/ProfileReducer'
import {withRouter} from "react-router";
class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.GetDocuments()
        this.props.GetProfiles()
    }

    render() {
        return(
           this.props.profiles.length !== 0 && <Profile profiles = {this.props.profiles} my_documents= {this.props.my_documents} ProfileId = {this.props.match.params.id}/>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    return {
        profiles: state.profile.profiles.filter(e => e.owner === state.auth.user.id),
        my_documents: state.profile.documents
    }
}

export  default  compose(withRouter, connect(mapStateToProps, {GetProfiles, GetDocuments}))(ProfileContainer)