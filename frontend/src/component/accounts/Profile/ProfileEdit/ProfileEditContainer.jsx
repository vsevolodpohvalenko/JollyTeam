import React from 'react'
import {connect} from 'react-redux'
import { ProfileEdit } from './ProfileEdit' 
import { GetCountries } from '../../../../redux/reducers/ProfileReducer'
class ProfileEditContainer extends React.PureComponent {
    componentDidMount(){
        debugger
        this.props.GetCountries()
    }
    
    render() {
        
        return <ProfileEdit userID = {this.props.userID} countries = {this.props.countries} />
    }
}
let mapStateToProps = (state) =>{
    debugger
    return {
        countries: state.profile.countries,
        userID: state.auth.user.id,
        
    }
   }
export default connect(mapStateToProps, {GetCountries})(ProfileEditContainer)