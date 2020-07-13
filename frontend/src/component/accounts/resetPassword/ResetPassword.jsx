import React from 'react'
import {Formik, Form, Field} from 'formik'
import {authAPI} from '../../../api'
import s from '../Login/login.module.css'
import { Link } from 'react-router-dom'
const initialValues = {
    email: ''
}


export const ResetPassword = (props) => {
    const onSubmit = (body) => {
        debugger
        const reset ={
            
            email: body.email
        }
        authAPI.forgot_password(reset)
    }
    return( <div>
        <div className={s.main}>
        <h2 className={s.text}>Reset password</h2>
        <h4>For Manufactures</h4>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="form-group"  >
                <Field className="form-control" placeholder="Enter your new password" name="email" type="email" />
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

