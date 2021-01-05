import React from 'react'
import {Field, Form, Formik} from 'formik'
import s from '../Login/login.module.css'
import {Link} from 'react-router-dom'
import {authAPI} from "../../../api/AuthApi";
import store from "../../../redux/redux_store";
import {createMessage} from "../../../redux/reducers/MessageReducer";
import {useHistory} from "react-router";

const initialValues = {
    reset_password: ''
}


export const ResetPasswordConfirm = (props) => {
    debugger
    const history = useHistory()
    const onSubmit = (body) => {
        debugger
        const reset = {

            uid: props.uid,
            token: props.token,
            new_password: body.new_password
        }
        authAPI.reset_password(reset).then(() => {
            store.dispatch(createMessage({log_in_ed: "Changed successful"}))
            history.push('/JollyTeam/login')
        })
    }
    return( <div>
        <div className={s.main}>
        <h2 className={s.text}>Reset password</h2>
        <h4>For Manufactures</h4>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form className="form-group"  >
                <Field className="form-control" placeholder="Enter your new password" name="new_password" type="password" />
                <button className={s.button} type="submit">
                    Reset Password
                </button>
            </Form>
        </Formik>
        <p>Don't have an account? <Link to="/JollyTeam/register">Sing up!</Link></p>

        </div>
    </div>
    )
    }

