import {FaqGroup, FaqItem} from "../Frequently_used_types";
import {instance} from "./profileApi";

export const faqAPI = {
    getFaq_Group: () => {
        return instance.get<FaqGroup>('api/faq_group/')
    },
    getFaq_Item: () => {
        return instance.get<FaqItem>('api/faq_item')
    },
    active_Item: (item: {
        id: number,
        Title: string,
        Answer: string,
        Active: boolean,
        Group: string
    }) => {
        return instance.put<{
            id: number,
            Title: string,
            Answer: string,
            Active: boolean,
            Group: string
        }>(`api/faq_item/${item.id}/`, {
            Group: item.Group,
            Title: item.Title,
            Answer: item.Answer,
            Active: item.Active,
        })
    }
}