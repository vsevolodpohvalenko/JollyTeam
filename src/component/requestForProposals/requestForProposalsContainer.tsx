import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RequestForProposals} from "./requestForProposals";
import {GetCountries, GetCategory} from "../../redux/reducers/ProfileReducer";
import {AppStateType} from "../../redux/redux_store";
import {Header} from "../layout/Header/Header";
import {Footer} from "../layout/Footer/Footer";

class RequestForProposalsContainer extends Component<PropsReduxType>{
    componentDidMount() {
        this.props.GetCountries()
        this.props.GetCategory()
    }

    render() {
        return <div><Header/><RequestForProposals currency = {this.props.currency}  /><Footer/></div>
    }

}

const mapStateToProps = (state: AppStateType) => {
    return{
        userId : state.auth.user.id,
        currency: state.profile.countries,
        category: state.profile.category
    }
}

const connector = connect(mapStateToProps, {GetCountries, GetCategory})
type PropsReduxType = ConnectedProps<typeof connector>

export default connector(RequestForProposalsContainer)
