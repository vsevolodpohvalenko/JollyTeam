import React, {Component} from 'react'
import {connect} from 'react-redux'
import s from './FAQ.module.css'
import cn from "classnames";
import {getFaqGroups, getFaqItems, ActiveId} from '../../redux/reducers/FAQReducer'
import {faqAPI} from "../../api/FaqApi";
import {useQuery} from 'react-apollo';
import {gql} from 'apollo-boost';

const QUERY_FAQGroups = gql`
        query {
            FAQGroups {
                Title,
                id
            }
            }`;

type RootPropsType = {
    getFaqGroups: () => void,
    getFaqItems: () => void,
    active_item: any,
    ActiveId: (item: {
        id: number,
        Title: string,
        Answer: string,
        Active: boolean,
        Group: number
    }) => void,
    items: Array<{
        id: number,
        Title: string,
        Answer: string,
        Active: boolean,
        Group: number
    }>,
    key: any,
    Groups: Array<{
        id: number
        Title: string
    }>
}


class FAQ_Group extends Component<RootPropsType> {
    componentDidMount() {
        this.props.getFaqGroups()
        this.props.getFaqItems()
    }

    //
    // componentDidUpdate(prevProps: RootPropsType, prevState: StateType, snapshot: any) {
    //     debugger
    //
    //     if (this.props.active_item !== prevProps.active_item) {
    //         faqAPI.active_Item(this.props.active_item)
    //     }
    // }

    render() {

        const ActivateItem = (item: {
            id: number, Title: string, Answer: string, Active: boolean, Group: number
        }) => {
            item.Active = !item.Active
            this.props.ActiveId(item)
        }
        const OnClick = (item: {
            id: number,
            Title: string,
            Answer: string,
            Active: boolean,
            Group: number
        }) => {
            ActivateItem(item)
        }
        const ItemsGroup = ({id, items, Title}: any) => {
            const suitableItems = items.filter((i: {
            id: number,
            Title: string,
            Answer: string,
            Active: boolean,
            Group: number
        }) => Number(i.Group) === Number(id))
            return (<div key={id}>
                <div className="row border-bottom ml-3 mb-3"><h5 className={s.group}>{Title}</h5></div>
                {suitableItems.map((item: any) => <div>
                    <h6 className={[s.item, "d-flex justify-content-between d-flex align-items-center"].join(' ')}><span
                        className="text-danger">{item.Title}</span>
                        <div onClick={() => OnClick(item)}
                             className={cn({[s.active]: item.Active}, s.menu_toogle)}>
                        </div>
                    </h6>
                    <p className={cn({[s.active]: item.Active}, s.group, s.dropdown)}>{item.Answer}</p>
                </div>)}
            </div>)
        }
        const FaqComplect = (props: {
            items: Array<{
                id: number,
                Title: string,
                Answer: string,
                Active: boolean,
                Group: number
            }>
        }) => {
            const {data, loading} = useQuery(
                QUERY_FAQGroups, {
                    pollInterval: 500 // refetch the result every 0.5 second
                }
            );


            let items = props.items
            if (loading) return <p>Loading...</p>;
            return (
                data.FAQGroups.map(({Title, id}: any) => <ItemsGroup id={id} items={items} Title={Title}   />
                ))
        }
        return (
            <div className={s.main}>
                <h3 className="container text-center mt-3 mb-3">FAQ</h3>
                <p className="middle text-center">In a professional context it often happens that private or
                    corporate</p>

                {this.props.items.length >= 1 && (<FaqComplect items={this.props.items}/>)}
            </div>)
    }
}

const mapStateToProps = (state: any) => {
    return {
        Groups: state.FAQ.groups,
        items: state.FAQ.items,
        active_item: state.FAQ.active_item

    }
}

export default connect(mapStateToProps, {getFaqGroups, getFaqItems, faqAPI, ActiveId})(FAQ_Group)