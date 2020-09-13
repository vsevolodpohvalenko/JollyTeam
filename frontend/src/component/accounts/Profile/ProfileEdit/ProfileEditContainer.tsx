import React from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {ProfileEdit} from './ProfileEdit'
import {
    updateManufacturer,
    updateDocument,
    postDocument,
} from '../../../../redux/reducers/ProfileReducer'
import {AppStateType} from "../../../../redux/redux_store";

export type CategoriesType = Array<{
        id: number,
        Name: string
    }>

class ProfileEditContainer extends React.PureComponent<PropsFromRedux> {

    render() {
        return this.props.profile.length !== 0 ?
            <ProfileEdit /> : <div>Loading</div>
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
})

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ProfileEditContainer)