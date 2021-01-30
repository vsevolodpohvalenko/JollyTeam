import React from 'react'
import {Field, Form, Formik} from 'formik'
import s from '../Login/login.module.css'
import {Link} from 'react-router-dom'
import {authAPI} from "../../../api/AuthApi";
import {createMessage} from "../../../redux/reducers/MessageReducer";
import store from "../../../redux/redux_store";

const initialValues = {
    email: ''
}


export const ResetPassword = (props) => {

    const onSubmit = (body) => {
        debugger
        const reset = {

            email: body.email
        }
        authAPI.forgot_password(reset).then(() => {
            store.dispatch(createMessage({log_in_ed: "Check your email"}))
        })

    }
    return( <div>
        <div className={s.main}>
        <h2 className={s.text}>Reset password</h2>
        <h4>For Manufactures</h4>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="form-group"  >
                <Field className="form-control" placeholder="Enter your email" name="email" type="email"/>
                <button className={s.button} type="submit">
                    Reset Password
                </button>
            </Form>
        </Formik>
        <p>Don't have an account? <Link to="/register">Sing up!</Link></p>

        </div>
    </div>
    )
    }

