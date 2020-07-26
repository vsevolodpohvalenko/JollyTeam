import React from "react";
import defaultImage from "../../../../media/default.jpg";
import clothesForCouples from '../../../../media/clothes.png'
import mansClothes  from '../../../../media/suit.svg'
import Sportswear from '../../../../media/boots.svg'
import womansClothes from '../../../../media/dress.svg'
import s from './ProfileView.module.css'
import {Link} from "react-router-dom";

export const ProfileView = (props) => {
    debugger
    return <div className={s.main}>
        {props.profiles.map(p => (
            <div>
                <div className={s.back} style={
                    {backgroundImage: ` linear-gradient( rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(56, 56, 56, 0.596), rgba(255, 255, 255, 0.56) ),  url(${p.companyProfilePicture || defaultImage})`}}>
                    <div className={s.name_country}>
                        <img className={s.logo} src={p.companyLogo}/>
                        <div>
                            <h3>{p.companyName}</h3>
                            <h5>{p.country}</h5>
                        </div>
                    </div>
                    <div className={[ s.edit_button, s.edit].join(' ') }><Link  to={"/profileEdit"}>Edit</Link></div>
                </div>

                <div className={s.box_size}>
                    <div className={[ s.button].join(' ') }><Link  to={"/profileEdit"}>Edit</Link></div>
                    <p>{p.companyDescription}</p>
                    <p>{p.section}</p>
                    {props.profiles[0] && JSON.parse(p.sections).map(e => (
                            <div className={s.section}>
                                <div>
                                    {e.Icon === "Clothes For Couples" && (<img className={s.icon} src={clothesForCouples}/>)}
                                    {e.Icon === "Man's Clothes" && (<img className={s.icon} src={mansClothes}/>)}
                                    {e.Icon === "Sportswear" && (<img className={s.icon} src={Sportswear}/>)}
                                    {e.Icon === "Woman's Clothes" && (<img className={s.icon} src={womansClothes}/>)}

                                    <h3>{e.Title}</h3>
                                </div>
                                <p>{e.Text}</p>

                            </div>
                        )
                    )}
                </div>
            </div>
        ))}
        {props.my_documents.map(d => (<div className={s.box_size}>
                <a href={d.Download} download><img src={d.Thumbnail}/></a>
                <small>{d.Title}</small>
                <a href={d.Download} download>Download</a>
            </div>
        ))}

    </div>

}