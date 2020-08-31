import React from "react";
import {connect} from "react-redux";
import {Profile} from "./Profile";
import {compose} from 'redux'
import {GetDocuments, GetProfiles} from '../../redux/reducers/ProfileReducer'
import {RouteComponentProps, withRouter} from "react-router";
import {AppStateType} from "../../redux/redux_store";


type PropsType = {
    profiles: Array<{
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: 1
    }> | never,
    my_documents: Array<{
        id: number,
        Title: string,
        Thumbnail: string,
        Download: string,
        owner: number
    }>,
    GetProfiles: () => void,
    GetDocuments: () => void,
    id : any

}

class ProfileContainer extends React.Component<PropsType & RouteComponentProps> {
    componentDidMount() {
        this.props.GetDocuments()
        this.props.GetProfiles()
    }

    render() {
        return (
            this.props.profiles.length < 1 &&
            <Profile profiles={this.props.profiles} my_documents={this.props.my_documents}
                     ProfileId={(this.props.match.params as any).id}/>
        )
    }
}

const mapStateToProps = (state: AppStateType) => {
    debugger
    return {
        profiles:state.profile.profiles.filter((e: any) => e.owner === state.auth.user.id),
        my_documents: state.profile.documents
    }
}

export default compose(withRouter, connect(mapStateToProps, {GetProfiles, GetDocuments}))(ProfileContainer)