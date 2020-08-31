import React, {PureComponent} from "react";
import {connect, ConnectedProps} from "react-redux";
import {Manufacturers} from "./manufacturers";
import {GetCountries, GetCategory, GetProfiles, GetSearchedData} from "../../redux/reducers/ProfileReducer";
import {AppStateType} from "../../redux/redux_store";


class ManufacturersContainer extends PureComponent<PropsReduxType>{
    componentDidMount() {
        debugger
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


const mapStateToProps= (state:AppStateType) => {
    return{
        profiles: state.profile.profiles,
        countries: state.profile.countries,
        categories: state.profile.category
    }
}
const connector = connect(mapStateToProps, {GetCountries, GetSearchedData, GetCategory, GetProfiles})

type PropsReduxType = ConnectedProps<typeof connector>

export default connector(ManufacturersContainer)