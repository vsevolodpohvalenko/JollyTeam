import React from "react";
import {Link} from "react-router-dom";
import s from './PageNotFound.module.css'
export const PageNotFound = () => {

    window.onmousemove = function (e) {
        const container = document.getElementById(`container`);
        let x = - e.clientX/5,
            y = - e.clientY/5;
        if (container){
            container.style.backgroundPositionX =  x + 'px'
            container.style.backgroundPositionY =  y + 'px'}
    }
    return (
        <div className={s.main}>
        <div id={'container'} className={s.container}>
            <div className={s.content}>
                <h2>404</h2>
                <h4>Opps! Page not found</h4>
                <p>This page you were looking for doesn't exist. You may have mistyped the address or the page may have moved:)</p>
                <Link to={"/JollyTeam/"}>Back to Home</Link>
            </div>
        </div>
        </div>
    )
}