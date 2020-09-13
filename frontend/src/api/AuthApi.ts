import {instance} from "./profileApi";
import {config} from "../api";

export const authAPI = {
    getUser: (tokenConfig: any) => {

        return instance.get<{
            first_name: string,
            id: number,
            email: string
        }>('auth/users/me/', tokenConfig)
    },
    login: (body: any) => {

        return instance.post('auth/token/login', body, config)
    },
    logout: (tokenConfig: any) => {

        return instance.post('auth/token/logout', "", tokenConfig)
    },
    register: (body: any) => {
        debugger
        return instance.post('auth/users/', body, config)
    },
    forgot_password: (body: any) => {

        return instance.post('auth/users/reset_password/', body)
    },
    reset_password: (body: any) => {

        return instance.post('auth/users/reset_password_confirm/', body)
    },
    activate: (body: any) => {
        debugger
        return instance.post('auth/users/activation/', {
            uid: body.uid,
            token: body.token
        })
    },
}