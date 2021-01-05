import React, {ChangeEvent, FormEvent} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../../redux/reducers/AuthReducer'
import s from './login.module.css'
import {compose} from "redux";
import {withRouter} from "react-router";
import {AppStateType} from "../../../redux/redux_store";
import {getCookie} from "../Register/register";


type RootPropsType = {
    isAuthenticated: boolean,
    login: (email: string, password: number | string, csrftoken: string| null) => void
}

class Login extends React.Component<RootPropsType> {
    state = {
        email: '',
        password: '',
    }


    onChange = (e: ChangeEvent<HTMLInputElement>) => this.setState({[e.target.name]: e.target.value})

    render() {
        const csrftoken = getCookie('csrftoken');
        if (this.props.isAuthenticated) {
            return <Redirect to="/JollyTeam/"/>
        }
        const {email, password} = this.state
        const onSubmit = (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            this.props.login(this.state.email, this.state.password, csrftoken)
        }
        return (
            <div className="col-md-12">
                <div className={s.main}>
                    <h2 className={s.text}>Login</h2>
                    <h4>For Manufacturers</h4>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Your E-Mail"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Your Password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>

                        <div className="form-group">

                            <button type="submit" className={s.button}>
                                Sing in
                            </button>
                        </div>
                        <p>
                            Don't have an account? <Link to="/JollyTeam/register" className={s.link}>Sing up</Link>
                        </p>
                        <p>
                            If your password is forgotten click it.<Link to="/JollyTeam/reset_password" className={s.link}>Forgot
                            password</Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default compose(withRouter, connect(mapStateToProps, {login}))(Login)