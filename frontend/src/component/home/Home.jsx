import React, {useState} from 'react'
import s from './Home.module.css'
import cn from "classnames";
import {NavLink} from 'react-router-dom'
import {Link} from "react-router-dom";

export const Home = (props) => {



    const {isAuthenticated} = props
    const Search = (search) => {
        debugger
        props.GetSearchedData(search)
        }





    const guestLinks = (
      <div className={s.auth}>
      <ul >
      <li><NavLink to="/register">Sing Up</NavLink></li>
      <li><NavLink to="/login" >Sing In</NavLink></li> 
    </ul></div>)
  
  
    const authLinks = ( 
      <div className={s.auth}>
    <ul >
      <li><a onClick={props.logout} href="/login">Logout</a></li>
    </ul></div>)
  
  
    const [active, setActive] = useState(true)
    const [search, setSearch] = useState([])

    return <div className={s.homebody}>
        <header className={s.header}>
          <a href="/" className={s.logo}> Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></a>
          <div onClick={() => setActive(!active)} className={cn({ [s.active] : active === true},s.menu_toogle)}></div>
          <nav className={cn({ [s.active] : active === true},s.homenav)}>
            <ul>
          <li><NavLink to="/manufacturers"> Manufactures</NavLink></li>
          <li><NavLink to="/faq" >FAQ</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li></ul>
            {isAuthenticated ? authLinks : guestLinks}


          </nav>

          <div className={s.clearfix}></div>
        </header>
        <div className={s.main}>
        <h3 className={s.homeh3}>Finding the right supplier is complicated. TextileSpot makes it easier</h3>
        <Link to="/request_for_quotation" type="submit" className={s.button}>
                    Request For Quotation
        </Link>
        <Link to="/manufacturers" type="submit" className={s.button}>
                    Manufacturer Overview
        </Link>
        <div className={s.inputwrapper}>
        <div className={s.icon} onClick={() => Search(search)}></div>
        <input placeholder="Search Manufacturers" value={search} onChange={(e) => setSearch(e.target.value)} type="text"/>
        </div>
        </div>
        </div> //:  <Redirect to={props.page[0].find}/>
}