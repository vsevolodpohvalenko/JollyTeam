import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Logout} from '../../redux/reducers/AuthReducer';
import {Home} from './Home';
import {GetSearchedData} from "../../redux/reducers/ProfileReducer";
import {AppStateType} from "../../redux/redux_store";


class HomeContainer extends React.Component<PropsReduxType> {
    render() {
        debugger
        return (
            <Home logout={this.props.Logout} GetSearchedData={this.props.GetSearchedData}
                  isAuthenticated={this.props.isAuthenticated}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        profiles: state.profile.profiles,
    }
}

const connector = connect(mapStateToProps, {Logout, GetSearchedData})

type PropsReduxType = ConnectedProps<typeof connector>

export default connector(HomeContainer)