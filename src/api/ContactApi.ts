import {instance} from "./profileApi";
import {config} from "../api";
import {ContactType} from "../Frequently_used_types";

export const contactAPI = {
    PutContact: (Target: { name: string, companyName: string, emailAddress: string, phoneNumber: string, subject: string, message: string, owner: number
    }) => {
        return instance.post<{
            name: string,
            companyName: string,
            emailAddress: string,
            phoneNumber: string,
            subject: string,
            message: string,
            owner: number
        }>('api/Contact/', Target, config)
    },
    GetContact: () => {
        return instance.get<Array<ContactType>>('api/Contact/', config)
    }
}