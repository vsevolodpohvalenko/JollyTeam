import * as  axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json',

    }
}
const config2 = {headers: {'Content-Type': 'multipart/form-data'}};


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

        return instance.post('auth/token/logout', "", tokenConfig)
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
        debugger
        return instance.post('auth/users/activation/', {
            uid: body.uid,
            token: body.token
        })
    },
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

    PostProfile: (id) => {
        debugger
        let form_data = new FormData();
        form_data.append('owner', String(id));
        return instance.post('api/manufacturerProfilePage/', form_data, config2)
    },

    PutProfile: (form_data, id) => {
        debugger
        return instance.patch(`api/manufacturerProfilePage/${id}/`, form_data, config2)
    },
    PatchDocuments: (form_data, id) => {
        return instance.patch(`api/Document/${id+1}/`, form_data, config2)
    },
    PostDocuments: (id) => {
        let form_data = new FormData();
        form_data.append('owner', String(id));
        return instance.post(`api/Document/`, form_data, config2)
    },
    DeleteDocuments: (id) => {
        return instance.delete(`api/Document/${id+1}`)
    },
    getCountries: () => {
        return axios.get('http://restcountries.eu/rest/v2/all')
    },
    getProfile: () => {
        return instance.get('api/manufacturerProfilePage')
    },
    getDocuments: () => {
        debugger
        return instance.get('api/Document/')
    },
    getCategory: () => {
        return instance.get("api/Category/")
    },
    getSearcheddData: (search) => {
        debugger
        return instance(`manufacturerProfilePage?search=${search}`)
    }
}


export const findPageAPI = {
    findPage: (search) => {
        debugger
        return instance.get(`links?search=${search}`)
    }
}