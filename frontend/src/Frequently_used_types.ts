export type RequestForQuotation = {
    id: number,
    keywords: string,
    category: string,
    descriptions: string,
    attachments: string,
    preferredCurrency: string,
    preferredUntilPrice: string,
    preferredShippingAgreement: string,
    destinationPort: string,
    paymentMethod: string,
    iAgree: string
}

export type ContactType= { id: number,
        name: string,
        companyName: string,
        emailAddress: string,
        phoneNumber: string,
        subject: string,
        message: string,
        owner: 1}
export type FaqGroup = { Title: string; id: number; }[]
export type FaqItem = { id: number, Title: string, Answer: string, Active: boolean, Group: string }[]