const GET_CONTACT = 'GET-CONTACT'

interface GetContact {
    type: typeof GET_CONTACT,
    payload: {
        id: number,
        name: string,
        companyName: string,
        emailAddress: string,
        phoneNumber: string,
        subject: string,
        message: string,
        owner: 1
    }[]

}
export type ContactActionTypes = GetContact
