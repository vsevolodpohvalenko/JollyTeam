import React from 'react'
import s from "./Preloader.module.css"
import preloader from '../../media/loading_animation.gif'
let Preloader = (props) => {
    
    return <img alt="Altight" className={s.Preloader} src={preloader}/>
}
export default Preloader;