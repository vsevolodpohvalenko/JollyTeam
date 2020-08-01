import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../../../redux/reducers/AuthReducer'
import s from './login.module.css'
import {compose} from "redux";
import {withRouter} from "react-router";



 class Login extends React.Component {
    state = {
        email: '',
        password: '',
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password)

        
         
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    render(){
      if(this.props.isAuthenticated){
        return <Redirect to="/"/>
      }
        const { email, password} = this.state

        return (
            <div className="col-md-12">
            <div className={s.main}>
              <h2 className={s.text}>Login</h2>
              <h4>For Manufacturers</h4>
              <form onSubmit={this.onSubmit}>
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
                  Don't have an account? <Link to="/register" className={s.link}>Sing up</Link>
                </p>
                 <p>
                  If your password is forgotten click it.<Link to="/reset_password" className={s.link}>Forgot password</Link>
                </p>
              </form>
            </div>
          </div>
        )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default compose(withRouter,connect(mapStateToProps, {login}))(Login)