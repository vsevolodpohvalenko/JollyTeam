import React from 'react'
import s from "./Preloader.module.css"
import preloader from '../../media/loading_animation.gif'
import {NavLink} from 'react-router-dom'

let Preloader = (props) => {

    return <div><img alt="Altight" className={s.Preloader} src={preloader}/>
    <small className={s.Nav}>The pages: Contact, Profile, Request for quotation and extra information about user are not accessible to users who are not logged in.</small>
        <h3><NavLink className={s.Nav} to={'/'}>
            <snap className={'text-danger'}>G</snap>
            o Back</NavLink></h3>

    </div>
}
export default Preloader;