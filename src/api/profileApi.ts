import axios, {AxiosPromise} from "axios";
import {CategoriesType} from "../component/accounts/Profile/ProfileEdit/ProfileEditContainer";
import {RequestForQuotation} from "../Frequently_used_types";
import {config2} from "../api";

type SingleDocument = {
        id: number,
        Title: string,
        Thumbnail: string,
        Download: string,
        owner: number
    }
type SingleProfile = {
        id: number,
        companyProfilePicture: string,
        companyName: string,
        companyDescription: string,
        country: string,
        companyLogo: string,
        sections: string,
        owner: number
    }

export const instance = axios.create({
    baseURL: 'https://jollyteam.herokuapp.com/api/',
});
export const profileAPI = {

   PostProfile: (id: number) => {
       debugger
       let form_data = new FormData();
       form_data.append('owner', String(id));
       return instance.post<SingleProfile>('api/CompanyProfilePage/', form_data, config2)
   },

   PutProfile: (form_data: {
       companyDescription: string,
       companyLogo: string,
       companyName: string,
       companyProfilePicture: string,
       country: string,
       id: number,
        owner: number,
        sections: string
    }, id: number) => {
        debugger
       return instance.patch<SingleProfile>(`api/CompanyProfilePage/${id}/`, form_data, config2)
    },
    PatchDocuments: (form_data: {
        Download: string,
        Thumbnail: string,
        Title: string,
        id: number,
        owner: number
    }, id: number) => {
        return instance.patch<SingleDocument>(`api/Document/${id + 1}/`, form_data, config2)
    },
    PostDocuments: (id: any) => {
        let form_data = new FormData();
        form_data.append('owner', String(id));
        return instance.post<SingleDocument>(`api/Document/`, form_data, config2)
    },
    DeleteDocuments: (id: number) => {
        return instance.delete<AxiosPromise>(`api/Document/${id + 1}`)
    },
    getCountries: () => {
        debugger
        return axios.get('http://restcountries.eu/rest/v2/all')
    },
    getProfile: () => {
        return instance.get<Array<SingleProfile>>('api/CompanyProfilePage/')
    },
    getDocuments: () => {
        debugger
        return instance.get<Array<SingleDocument>>('api/Document/')
    },
    getCategory: () => {
        return instance.get<CategoriesType>("api/Category/")
    },
    getSearchedData: (search: string) => {
        debugger
        return instance.get<Array<SingleProfile>>(`CompanyProfilePage?search=${search}`)
    },
    postRequestForQuotations: (request: any) => {
        return instance.post<Array<RequestForQuotation>>('api/RequestForQuotation/', request)
    },
    getPaymentMethods: () => {
        return instance.get('api/PaymentMethods/')
    }
}