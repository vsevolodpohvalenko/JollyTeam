import React, {Component} from "react";
import {connect} from "react-redux";
import {RequestForQuotation} from "./requestForQuotation";
import {GetCountries, GetCategory} from "../../redux/reducers/ProfileReducer";

class RequestForQuotationContainer extends Component{
    componentDidMount() {
        this.props.GetCountries()
        this.props.GetCategory()
    }

    render() {
        return <RequestForQuotation currency = {this.props.currency} category={this.props.category} groups={this.props.groups}/>
    }

}

const mapStateToProps = (state) => {
    return{
        userId : state.auth.user.id,
        currency: state.profile.countries,
        category: state.profile.category
    }
}

export default connect(mapStateToProps, {GetCountries, GetCategory})(RequestForQuotationContainer)
