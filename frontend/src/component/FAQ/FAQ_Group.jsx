import React, {Component} from 'react'
import { connect } from 'react-redux'
import {faqAPI} from '../../api'
import s from './FAQ.module.css'
import cn from "classnames";
import {getFaqGroups, getFaqItems, ActiveId} from '../../redux/reducers/FAQReducer'
class FAQ_Group extends Component {
    componentDidMount() {
        this.props.getFaqGroups()
        this.props.getFaqItems()
        }

    componentDidUpdate(prevProps, prevState, snapshot) {
                if (this.props.active_item !== prevProps.active_item) {
            faqAPI.active_Item(this.props.active_item)
            console.log("Updated")
            this.props.getFaqItems()
        }
    }

    render(){
            const OnClick = (item) => {
                this.props.ActiveId(item)
            }
            const FaqComplect = ({Title, id}) => {
                const items = this.props.items.filter(i => i.Group === id)
                return (<div key={this.props.key} >

                    <div className="row border-bottom ml-3 mb-3"> <h5 className={s.group}>{Title}</h5></div>
            {items.map(item=> <div>
                <h6 className={[s.item, "d-flex justify-content-between d-flex align-items-center"].join(' ')} ><span className="text-danger">{item.Title}</span>
            <div onClick={()=> OnClick(item)} className={cn({ [s.active] : item.Active === true},s.menu_toogle)}>
            </div>
                </h6>
            <p className={cn({ [s.active] : item.Active === true},s.group, s.dropdown)}>{item.Answer}</p>
            </div>)}
            </div>)
            }
            return (
                <div className={s.main}>
                <h3 className="container text-center mt-3 mb-3">FAQ</h3>
                <p className="middle text-center">In a professional contex it often happens that private or corporate</p>
                {this.props.Groups.map((g, index) => (<FaqComplect key={index} Title = {g.Title} id={g.id}/>))}
                  </div>)
}
}
 const mapStateToProps= (state) => {
    return {
        Groups: state.FAQ.groups,
        items : state.FAQ.items,
        active_item: state.FAQ.active_item
        
    }
}

export default connect(mapStateToProps, {getFaqGroups ,getFaqItems, faqAPI, ActiveId})(FAQ_Group)