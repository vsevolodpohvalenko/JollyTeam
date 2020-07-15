import React from 'react'
import {connect} from 'react-redux'
import {getContent} from '../../redux/reducers/ContentReducer'
import { Content } from './content'
import Preloader from '../Preloader/preloader'
class ContentContainer extends React.PureComponent {
    componentDidMount(){

        this.props.getContent()
    }
    render() {
        debugger
        return(
           this.props.content.length === 0 ? <Preloader/> : <div><Content  content = {this.props.content}/></div>
        )
    }
}
let mapStateToProps = (state) =>{
    return {
        content: state.content.content
    }
   }
export default connect(mapStateToProps, {getContent})(ContentContainer)