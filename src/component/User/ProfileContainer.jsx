import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {compose} from 'redux'
import {GetDocuments, GetProfiles} from '../../redux/reducers/ProfileReducer'
import {RouteComponentProps, withRouter} from "react-router";
import {AppStateType} from "../../redux/redux_store";
import {GetDocumentsSelector, GetSuitableProfile} from "../../redux/reducers/Profile-selectors";
import store from '../../redux/redux_store'

// type PropsType = {
//     profiles: Array<{
//         id: number,
//         companyProfilePicture: string,
//         companyName: string,
//         companyDescription: string,
//         country: string,
//         companyLogo: string,
//         sections: string,
//         owner: 1
//     }> | never,
//     my_documents: Array<{
//         id: number,
//         Title: string,
//         Thumbnail: string,
//         Download: string,
//         owner: number
//     }>,
//     GetProfiles: () => void,
//     GetDocuments: () => void,
//     id : any
//
// }

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.GetDocuments()
        this.props.GetProfiles()
    }

    render() {
        return (
            this.props.profileS.length >= 1 && this.props.my_documents  && <Profile profiles={this.props.profileS} my_documents={this.props.my_documents}/>
        )
    }
}

const mapStateToProps = (state) => {
    debugger
    return {
        my_documents: GetDocumentsSelector(state),
        profileS: state.profile.profiles
    }
}

export default compose(withRouter, connect(mapStateToProps, {GetProfiles, GetDocuments}))(ProfileContainer)