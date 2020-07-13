import React, {Fragment} from 'react'
import './Footer.css'

export const Footer =() => {
    return <Fragment >
        <div className= "d-none footer  db d-md-block">
<nav className="navbar  navbar-expand-md  ">
  <a className="navbar-brand navl text-white" href="#">Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></a>
  
  <div className="collapse navbar-collapse justify-content-end navr" id="navbar">
    <ul className="navbar-nav d-flex ">
      <li className="nav-item ">
        <a className="nav-link text-white" href="#">Manufacture </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-danger " href="#">FAQ</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="#">Contact</a>
      </li>
    </ul>
    

  </div>
</nav>
<small className="nav-link text-white " href="#">TextileSpot. 2019</small>
</div>
<nav className="navbar db navbar-light d-md-none justify-content-center ">
  <ul className="navbar-nav">
    <a className="navbar-brand navl navl" href="#">Textile<span className="text-danger">S</span>pot<span className="text-danger">.</span></a>
    <li className="nav-item ">
        <a className="nav-link text-white" href="#">Manufacture </a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-danger "  href="#">FAQ</a>
      </li>
      <li className="nav-item">
        <a className="nav-link text-white" href="#">Contact</a>
      </li>
      <li className="nav-item">
        <small className="nav-link text-white " href="#">TextileSpot. 2019</small>
      </li>
    </ul>
</nav>

    </Fragment>
}