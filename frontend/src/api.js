import * as  axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',

    }
}
const config2 = { headers: { 'Content-Type': 'multipart/form-data' } };


const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',


});

export const faqAPI = {
    getFaq_Group: () => {
        return instance('api/faq_group/')
    },
    getFaq_Item: () => {
        return instance.get('api/faq_item')
    },
    active_Item: (item) => {
        return instance.put(`api/faq_item/${item.id}/`, {
            Group: item.Group,
            Title: item.Title,
            Answer: item.Answer,
            Active: item.Active,
        })
    }
}
export const authAPI = {
    getUser: (tokenConfig) => {

        return instance.get('auth/users/me/', tokenConfig)
    },
    login: (body) => {

        return instance.post('auth/token/login', body, config)
    },
    logout: (tokenConfig) => {

        return instance.post('auth/token/logout', "" , tokenConfig)
    },
    register: (body) => {

        return instance.post('auth/users/', body, config)
    },
    forgot_password: (body) => {

        return instance.post('auth/users/reset_password/', body)
    },
    reset_password: (body) => {

        return instance.post('auth/users/reset_password_confirm/', body)
    },
    activate: (body) => {

        return instance.post('auth/users/activation/', { 
            uid: body.uid,
            token: body.token
         })
    },
    activate2: (body) => {
        return instance.post('api/activation/', body)
    }
}

export const contentAPI = {
    content: () => {

        return instance.get('api/ContentPage/')
    }
}

export const contactAPI = {
    PutContact: (body) => {

        return instance.post('api/Contact/', body, config)
    }
}

export const profileAPI = {
    PostProfile : (form_data) => {

        return instance.post('api/manufacturerProfilePage/', form_data, config2 )
    },
    PostDocument: (form_data) => {
        return instance.post('api/Document/', form_data, config2)
    },
    PostSection: (form_data) => {
        return instance.post('api/Section/', form_data, config2)
    },
    getCountries : () => {
        debugger
        return axios.get('http://restcountries.eu/rest/v2/all')
    }
}