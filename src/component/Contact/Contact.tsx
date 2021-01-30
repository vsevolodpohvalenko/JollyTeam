import React from 'react'
import {Formik, Form, Field, FormikErrors} from 'formik'
import s from './Contact.module.css'
import {contactAPI} from "../../api/ContactApi";
import {gql} from "apollo-boost";
import {useMutation} from "react-apollo";
import store from "../../redux/redux_store";
import {createMessage} from "../../redux/reducers/MessageReducer";
import {useHistory} from "react-router-dom";


const validate: ValidateType = (values) => {
    const errors: any = {}
    if (!values.emailAddress) {
        errors.emailAddress = 'Required!'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)) {
        errors.emailAddress = 'Invalid email address'
    }
    if (!values.message) {
        errors.message = 'Required'
    }

    return errors;
};

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
type ValidateType = (values: { name: string; companyName: string; emailAddress: string; phoneNumber: string; subject: string; message: string; }) => void | object | Promise<FormikErrors<{ name: string; companyName: string; emailAddress: string; phoneNumber: string; subject: string; message: string; }>>


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
        }).then(r => {
            history.push('/')
            store.dispatch(createMessage({log_in_ed: "Contact form was delivered"}))
            store.dispatch(createMessage({log_in_ed: "Wait for the answer"}))
        })
    }

    const FormikElement = (props: {
        label: string,
        name: string,
        error: string | null,
        placeholder: string
    }) => (
        <div className={s.form}>
            <label>{props.label}</label>
            <Field className={["form-control", props.error && s.validInput].join(" ")} name={[props.name]}
                   placeholder={`Enter Your ${props.placeholder}`}/>
        </div>
    )


    return <div className={s.main}>
        <div>
            <h2 className={s.contact} >Contact Us</h2>
        <Formik validate={validate} initialValues={initialValues} onSubmit={onSubmit}>
            {({errors, touched}) => (
                <Form className="form-group">
                    <div className={s.line}>
                        <FormikElement error={null} label="Name" name="name" placeholder="Name"/>
                        <FormikElement error={null} label="Company Name" name="companyName" placeholder="Company Name"/>
                    </div>
                    <div className={s.line}>
                        <div className={s.form}>
                            <label>Email Address<span style={{color: 'red'}}> *</span></label>
                            <Field
                                className={["form-control", errors.emailAddress && touched.emailAddress && s.validInput].join(" ")}
                                name="emailAddress" placeholder={`Enter Your Email Address`}/>
                            {errors.emailAddress && touched.emailAddress ? <div style={{color: '#ff4d4f'}}>{errors.emailAddress}</div> : null}
                        </div>
                        <FormikElement error={null} label="Subject" name="subject" placeholder="Subject"/></div>
                    <div className={s.form}>
                            <label>Message<span style={{color: 'red'}}> *</span></label>
                            <Field
                                className={["form-control", errors.message && touched.message && s.validInput].join(" ")}
                                name="message" placeholder={`Enter Your Message`}/>
                            {errors.message && touched.message ? <div style={{color: '#ff4d4f'}}>{errors.message}</div> : null}
                        </div>

                    <button className={s.button} type="submit">Submit</button>
                </Form>)}
        </Formik>
            </div>
    </div>
}