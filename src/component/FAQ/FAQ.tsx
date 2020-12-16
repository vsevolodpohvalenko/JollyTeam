import React from 'react'
import {gql} from "apollo-boost";
import {useMutation, useQuery} from 'react-apollo';
import s from "./FAQ.module.css";
import cn from "classnames";
import Preloader from "../Preloader/preloader";
import {Header} from "../layout/Header/Header";
import {Footer} from "../layout/Footer/Footer";

const Query_Groups = gql`
  query {
    FAQGroups {
        Title,
        id
    }
}`;

const Query_Item = gql`
  query {
    FAQItems{
        Title
        Group{
        id
        Title
      }
        Answer
        Active
        id
}
}`;

const Update_Item = gql`
mutation updateItem($id: Int! $Title: String $Group: ID $Active: Boolean $Answer: String){
  updateItem(id: $id ,input:{
    Title: $Title,
    Group: $Group,
    Answer: $Answer,
    Active: $Active
  }){
    item{
      Title
      Group{
        id
        Title
      }
      Answer
      Active
      id
    }
  }
}
`;



export const FrequentlyAskedQuestions = () => {
    const [updateItem] = useMutation(Update_Item);
        const OnClick = (item: {
        id: number,
        Title: string,
        Answer: string,
        Active: boolean,
        Group: { id: number, Title: string }
    }) => {
        debugger

        const id = Number(item.id)

        updateItem({
            variables: {
                id: id,
                Title: item.Title,
                Group: Number(item.Group.id),
                Answer: item.Answer,
                Active: !item.Active
            }
        });
    }
    const {data, loading}: any = useQuery(
        Query_Groups, {
            pollInterval: 5000// refetch the result every 0.5 second
        }
    );

    const SuitableItems = (props: any) => {
        const {data, loading}: any = useQuery(
            Query_Item, {
                pollInterval: 5000// refetch the result every 0.5 second
            }
        );

        if (loading) return <Preloader/>;
        // if (!data.items.edges.node) return <Preloader/>
        const suitableItems = data.FAQItems.filter((i: any) => Number(i.Group.id) === Number(props.Id))
        return (
            <div key={props.Id}>
                {suitableItems.map((item: any) => <div key={item.id}>
                    <h6 className={[s.item, "d-flex justify-content-between d-flex align-items-center"].join(' ')}><span
                        className="text-danger">{item.Title}</span>
                        <div
                            className={cn({[s.active]: item.Active}, s.menu_toogle)}
                            onClick={() => OnClick(item)}
                        >
                        </div>
                    </h6>
                    <p className={cn({[s.active]: item.Active}, s.group, s.dropdown)}>{item.Answer}</p>
                </div>)}
            </div>
        )
    }

    if (loading) return <Preloader/>;
    return (
        <div>
            <Header/>
            <div className={s.main}>
                <h3 className="container text-center mt-3 mb-3">FAQ</h3>
                <p className="middle text-center">Here you can find all the information you need</p>
                {data.FAQGroups.map((group: any) =>
                    <div key={group.id}>
                        <div className="row border-bottom ml-3 mb-3"><h5 className={s.group}>{group.Title}</h5></div>
                        <SuitableItems Id={group.id}/>
                    </div>)}
            </div>
            <Footer/>
        </div>
    )
}