import React, {Fragment} from 'react'
import './Footer.css'
import {Link} from "react-router-dom";

export const Footer =() => {
    return <Fragment >
        <div className= "d-none footer  db d-md-block">
<nav className="navbar  navbar-expand-md  ">
  <Link className="navbar-brand navl text-white" to="/">Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></Link>
  
  <div className="collapse navbar-collapse justify-content-end nav" id="navbar">
    <ul className="navbar-nav d-flex ">
      <li className="nav-item ">
        <Link className="nav-link text-white" to="/companies">Companies</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-danger " to={"/faq"}>FAQ</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to={"/contact"}>Contact</Link>
      </li>
    </ul>
    

  </div>
</nav>
<small className="nav-link text-white " >TextileSpot. 2019</small>
</div>
<nav className="navbar db navbar-light d-md-none justify-content-center ">
  <ul className="navbar-nav">
    <Link className="navbar-brand navl navl" to={"/"}>Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></Link>
    <li className="nav-item ">
        <Link className="nav-link text-white" to="/manufacturers">Companies </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-danger " to={"/faq"}>FAQ</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to={"/contact"}>Contact</Link>
      </li>
      <li className="nav-item">
        <small className="nav-link text-white " >TextileSpot. 2019</small>
      </li>
    </ul>
</nav>

    </Fragment>
}