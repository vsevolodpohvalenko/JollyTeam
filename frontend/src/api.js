import * as  axios from 'axios'

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
        debugger
        return instance.get('auth/users/me/', tokenConfig)
    },
    login: (body, config) => {

        return instance.post('auth/token/login', body, config)
    },
    logout: (tokenConfig) => {

        return instance.post('auth/token/logout', null, tokenConfig)
    },
    register: (body, config) => {

        return instance.post('auth/users/', body, config)
    },
    forgot_password: (body) => {

        return instance.post('auth/users/reset_password/', body)
    },
    reset_password: (body) => {
        debugger
        return instance.post('auth/users/reset_password_confirm/', body)
    },
    activate: (body) => {
        debugger
        return instance.post('auth/users/activation/', { 
            uid: body.uid,
            token: body.token
         })
    }
}