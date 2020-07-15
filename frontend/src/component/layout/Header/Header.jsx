import React, {Fragment, useState} from 'react'
import s from './Header.module.css'
import cn from "classnames";
import {Link} from 'react-router-dom'

 
export const Header =(props) => {
  const {isAuthenticated, user} = props


  const guestLinks = (
    <ul >
    <li><a href=""> Manufactures</a></li>
    <li><a href="" className={s.active}>FAQ</a></li>
    <li><a href="">Contact</a></li> 
    <span>
    <li><Link to="/register">Sing Up</Link></li>
    <li><Link to="/login" >Login</Link></li>   
    </span>
  </ul>)


  const authLinks = ( <ul >
    <li><a href=""> Manufactures</a></li>
    <li><a href="/faq" >FAQ</a></li>
    <li><a href="">Contact</a></li>
    <li><a onClick={props.Logout} href="">Logout</a></li>    
  </ul>)


  const [active, setActive] = useState(true)



    return <Fragment>
        <header className={s.header}>
          <a href="/" className={s.logo}> Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></a>
          <div onClick={() => setActive(!active)} className={cn({ [s.active] : active === true},s.menu_toogle)}></div>
          <nav className={cn({ [s.active] : active === true},s.nav)}>
            .{isAuthenticated ? authLinks : guestLinks}

          </nav>
          
          <div className={s.clearfix}></div>
        </header>
    </Fragment>
}

