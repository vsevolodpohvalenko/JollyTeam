import React, {Fragment, useState} from 'react'
import s from './Header.module.css'
import cn from "classnames";
import {NavLink, Link} from 'react-router-dom'
import store from "../../../redux/redux_store";


export const Header = (props) => {
    const isAuthenticated = store.getState().auth.isAuthenticated


    const guestLinks = (
        <div className={s.auth}>
            <ul>
                <li><NavLink to="/JollyTeam/register">Sing Up</NavLink></li>
    <li><NavLink to="/JollyTeam/login" >Login</NavLink></li>
  </ul>
      </div>)


  const authLinks = (
      <div className={s.auth}>
    <ul>
      <li><Link onClick={props.logout} to="/JollyTeam/profileView">My Profile</Link></li>
    </ul></div>
  )


  const [active, setActive] = useState(true)



    return <Fragment>
                <header className={s.header}>
                    <a href="/JollyTeam/" className={s.logo}> Jolly<span className="text-danger">T</span>eam<span
                        className="text-danger">.</span></a>
                    <div onClick={() => setActive(!active)}
                         className={cn({[s.active]: active === true}, s.menu_toogle)}></div>
          <nav className={cn({ [s.active] : active === true},s.homenav)}>
            <ul>
                <li><NavLink to="/JollyTeam/companies">Companies</NavLink></li>
                <li><NavLink to="/JollyTeam/faq">FAQ</NavLink></li>
          <li><NavLink to="/JollyTeam/contact">Contact</NavLink></li></ul>
            {isAuthenticated ? authLinks : guestLinks}


          </nav>

          <div className={s.clearfix}></div>
        </header>
    </Fragment>
}

