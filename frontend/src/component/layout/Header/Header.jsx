import React, {Fragment, useState} from 'react'
import s from './Header.module.css'
import cn from "classnames";
import {Link, NavLink} from 'react-router-dom'

 
export const Header =(props) => {
  const {isAuthenticated, user} = props


  const guestLinks = (
    <ul >
    <li><NavLink to=""> Manufactures</NavLink></li>
    <li><NavLink to="/faq" className={s.active}>FAQ</NavLink></li>
    <li><NavLink to="/contact">Contact</NavLink></li> 
    <span>
    <li><NavLink to="/register">Sing Up</NavLink></li>
    <li><NavLink to="/login" >Login</NavLink></li>   
    </span>
  </ul>)


  const authLinks = ( <ul >
    <li><NavLink to=""> Manufactures</NavLink></li>
    <li><NavLink to="/faq" >FAQ</NavLink></li>
    <li><NavLink to="/contact">Contact</NavLink></li>
    <li><a onClick={props.Logout} href="">Logout</a></li>    
  </ul>)


  const [active, setActive] = useState(true)



    return <Fragment>
        <header className={s.header}>
          <a href="/" className={s.logo}> Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></a>
          <div onClick={() => setActive(!active)} className={cn({ [s.active] : active === true},s.menu_toogle)}></div>
          <nav className={cn({ [s.active] : active === true},s.nav)}>
            {isAuthenticated ? authLinks : guestLinks}

          </nav>
          
          <div className={s.clearfix}></div>
        </header>
    </Fragment>
}

