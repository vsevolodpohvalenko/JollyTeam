import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Manufacturers} from "./manufacturers";
import {GetCountries, GetCategory, GetProfiles, GetSearchedData} from "../../redux/reducers/ProfileReducer";

class ManufacturersContainer extends PureComponent{
    componentDidMount() {
        this.props.GetCategory()
        this.props.GetCountries()
        this.props.GetProfiles()
    }

    render() {
        return(
            <Manufacturers profiles={this.props.profiles} GetSearchedData={this.props.GetSearchedData} categories = {this.props.categories} countries = {this.props.countries}/>
        )
    }
}

const mapStateToProps= (state) => {
    return{
        profiles: state.profile.profiles,
        countries: state.profile.countries,
        categories: state.profile.category
    }
}

export default connect(mapStateToProps, {GetCountries, GetSearchedData, GetCategory, GetProfiles})(ManufacturersContainer)