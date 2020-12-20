import React from 'react'
import {Formik, Form, Field} from 'formik'
import s from './Contact.module.css'
import {contactAPI} from "../../api/ContactApi";
import {gql} from "apollo-boost";
import {useMutation} from "react-apollo";
import store from "../../redux/redux_store";
import {createMessage} from "../../redux/reducers/MessageReducer";
import {useHistory} from "react-router-dom";


const Create_Contact = gql`
mutation createContact($owner_: Int! $name_: String $subject_: String $emailAddress_: String $message_: String $companyName_: String $phoneNumber_: String){
  createContact(
    owner_: $owner_,
    name_: $name_,
    subject_: $subject_,
    emailAddress_: $emailAddress_
    message_: $message_,
    companyName_: $companyName_,
    phoneNumber_: $phoneNumber_,
  ){
contact{
    phoneNumber
    subject
    emailAddress
  }
  }
  }
`;

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

    const history = useHistory()
    const [createContact, {data}] = useMutation(Create_Contact);
    const onSubmit = (body: {
        name: string,
        companyName: string,
        emailAddress: string,
        phoneNumber: string,
        subject: string,
        message: string
    }) => {
        debugger
        const owner = {
            owner: Number(props.userID)
        }
        const Target = Object.assign(body, owner)
        createContact({
            variables: {
                owner_: Number(props.userID),
                name_: body.name,
                subject_: body.subject,
                emailAddress_: body.emailAddress,
                message_: body.message,
                companyName_: body.companyName,
                phoneNumber_: body.phoneNumber,
            }
        }).then(r =>
        {history.push('/')
            store.dispatch(createMessage({log_in_ed: "Contact form was delivered"}))
            store.dispatch(createMessage({log_in_ed: "Wait for the answer"}))})
    }

    const FormikElement = (props: {
        label: string,
        name: string,
        placeholder: string
    }) => (
        <div className={s.form}>
            <label>{props.label}</label>
            <Field className="form-control" name={[props.name]} placeholder={`Enter Your ${props.placeholder}`}/>
        </div>
    )

    return <div className={s.main}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="form-group">
                <div className={s.line}>
                    <FormikElement label="Name" name="name" placeholder="Name"/>
                    <FormikElement label="Company Name" name="companyName" placeholder="Company Name"/>
                </div>
                <div className={s.line}>
                    <FormikElement label="Email Address" name="emailAddress" placeholder="Email Address"/>
                    <FormikElement label="Phone Number" name="phoneNumber" placeholder="Phone Number"/>
                </div>
                <FormikElement label="Subject" name="subject" placeholder="Subject"/>
                <FormikElement label="Message" name="message" placeholder="Message"/>
                <button className={s.button} type="submit">Put Contact</button>
            </Form>
        </Formik>
    </div>
}