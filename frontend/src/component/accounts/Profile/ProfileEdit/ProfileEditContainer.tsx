import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ProfileEdit} from './ProfileEdit'

import {AppStateType} from "../../../../redux/redux_store";
import {GetDocuments, GetProfiles} from "../../../../redux/reducers/ProfileReducer";

export type CategoriesType = Array<{
        id: number,
        Name: string
    }>

class ProfileEditContainer extends React.PureComponent<PropsFromRedux> {

    componentDidMount() {
        this.props.GetDocuments()
        this.props.GetProfiles()
    }

    render() {
        debugger
        return this.props.profile[0] != undefined ?
            this.props.profile[0].id != 0 && <ProfileEdit/> : <div>Loading</div>
    }
}

let mapStateToProps = (state: AppStateType) => {

    debugger
    return {
        countries: state.profile.countries,
        userID: state.auth.user.id ,
        profile: state.profile.profiles,
        documents: state.profile.documents,
        category: state.profile.category
    }
}

const connector = connect(mapStateToProps, {
    GetDocuments, GetProfiles
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProfileEditContainer)