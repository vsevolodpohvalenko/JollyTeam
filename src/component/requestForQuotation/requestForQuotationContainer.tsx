import React, {Component} from "react";
import {connect, ConnectedProps} from "react-redux";
import {RequestForQuotation} from "./requestForQuotation";
import {GetCountries, GetCategory} from "../../redux/reducers/ProfileReducer";
import {AppStateType} from "../../redux/redux_store";

class RequestForQuotationContainer extends Component<PropsReduxType>{
    componentDidMount() {
        this.props.GetCountries()
        this.props.GetCategory()
    }

    render() {
        return <RequestForQuotation  />
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

export default connector(RequestForQuotationContainer)
