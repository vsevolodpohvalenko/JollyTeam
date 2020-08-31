import React from 'react'
import {Formik, Form, Field} from 'formik'
import s from './Contact.module.css'
import {contactAPI} from "../../api/ContactApi";

const initialValues = {
    name: '',
    companyName: '',
    emailAddress: '',
    phoneNumber: '',
    subject: '',
    message: '',
    

}

type PropsType = {
    userID: string | null
}

export const Contact = (props: PropsType) => {
    const onSubmit = (body: {
        name: string,
        companyName: string,
        emailAddress: string,
        phoneNumber: string,
        subject: string,
        message: string


    }) => {
        
        const owner = {
            owner : Number(props.userID)
        }
        const Target = Object.assign(body, owner)
        contactAPI.PutContact(Target)
    }

    const FormikElement = (props: {
        label: string,
        name: string,
        placeholder: string
    }) =>  (
        <div className={s.form}>
        <label>{props.label}</label>
        <Field className="form-control" name={[props.name]} placeholder={`Enter Your ${props.placeholder}`}/>
        </div>
    )

    return <div className={s.main}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="form-group">
                <div className={s.line}>
                <FormikElement label = "Name" name = "name" placeholder ="Name"/>
                <FormikElement label = "Company Name" name = "companyName" placeholder ="Company Name"/>
                </div>
                <div className={s.line}>
                <FormikElement label = "Email Address" name = "emailAddress" placeholder ="Email Address"/>
                <FormikElement label = "Phone Number" name = "phoneNumber" placeholder ="Phone Number"/>
                </div>
                <FormikElement label = "Subject" name = "subject" placeholder ="Subject"/>
                <FormikElement label = "Message" name = "message" placeholder ="Message"/>
                <button className={s.button} type="submit">Put Contact</button>
            </Form>
        </Formik>
    </div>
}